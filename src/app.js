const Koa = require('koa');
const helmet = require("koa-helmet");
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const router = require('./lib/routes')
const { connect, ObjectId } = require('./lib/service/db')
const serve = require('koa-static');
const fs = require('fs')
const path = require('path')
const session = require('koa-session')
const cors = require('@koa/cors');
const SessionStore = require('./lib/service/sessionStore')
const webSocket = require('./lib/service/webSocket');
const passport = require('koa-passport')

const app = new Koa()
require('./lib/service/rateLimiter')(app)

app.keys = ['tokinechiya']

app.proxy = true

app.use(cors({
    credentials: true
}))

app.use(session({
    renew: true,
    genid: () => new ObjectId(),
    store: new SessionStore({
        expires: 86400 * 7 // 7 days
    })
}, app))

app.use(bodyParser())

require('./lib/service/auth')
app.use(passport.initialize())
app.use(passport.session())

app.use(logger())
app.use(helmet())
app.use(serve(path.join(__dirname, '../public/dist')))

// error handler
app.use(async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream(path.join(__dirname, '../public/dist/index.html'))
        }
    } catch (err) {
        if (err.stack) console.log(err.stack)
        ctx.status = err.status || 500
        ctx.response.body = err
    }
})

require('./lib/graphql')(app)

app.use(router.routes())
app.use(router.allowedMethods())

module.exports = {
    run: async (port) => {
        await connect()
        let server = await app.listen(port)
        webSocket.init(server)
        require('./lib/service/schedule')
        console.log(`Server Listening ${port}`)
    },
    app
}

