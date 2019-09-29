const Koa = require('koa');
const helmet = require("koa-helmet");
const bodyParser = require('koa-bodyparser')
const logger = require('koa-morgan')
const router = require('./lib/routes')
const { connect } = require('./lib/service/db')
const serve = require('koa-static');
const path = require('path')
const cors = require('@koa/cors');
const webSocket = require('./lib/service/webSocket');
const passport = require('koa-passport')
require('./lib/service/auth')

const app = new Koa()
app.use(require('./lib/service/rateLimiter'))
app.keys = ['tokinechiya']
app.proxy = true
app.use(cors({
    credentials: true
}))
app.use(require('./lib/service/session')(app))
app.use(bodyParser())
app.use(passport.initialize())
app.use(passport.session())
app.use(logger('tiny'))
app.use(helmet())
app.use(serve(path.join(__dirname, '../public/dist')))
// 较影响吞吐量
app.use(require('./lib/service/compress'))
app.use(require('./lib/service/errorHandler'))
app.use(require('./lib/service/graphql'))
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

