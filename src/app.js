const Koa = require('koa');
const helmet = require("koa-helmet");
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const { ApolloServer, gql } = require('apollo-server-koa')
const router = require('./lib/routes')
const db = require('./lib/service/db')
const serve = require('koa-static');
// const sendfile = require('koa-sendfile')
const path = require('path')
const session = require('koa-session')
const cors = require('@koa/cors');
const SessionStore = require('./lib/service/sessionStore')
const webSocket = require('./lib/service/webSocket');

const typeDefs = gql(require('./lib/graphql/typeDefs'))
const resolvers = require('./lib/graphql/resolvers')

const app = new Koa();

app.use(cors({
    credentials: true
}))

app.use(session({
    renew: true,
    store: new SessionStore({
        expires: 86400 * 7 // 7 days
    })
}, app))

app.use(bodyParser())

app.use(async (ctx, next) => {
    ctx.body = ctx.request.body
    await next()
})

app.keys = ['tokinechiya']
app.use(logger())
app.use(helmet())
app.use(serve(path.join(__dirname, '../public/dist')))

// error handler
app.use(async (ctx, next) => {
    try {
        await next()
    } catch (err) {
        console.log(err.message)
        ctx.status = err.status || 500
        ctx.response.body = err
    }
})

app
    .use(router.routes())
    .use(router.allowedMethods())

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ ctx }) => {
        // todo: add session
        return ctx
        // return {
        //      authScope: getScope(ctx.headers.authorization)
        // }
    }
})

server.applyMiddleware({ app }) // 需要最后注册，没有next()

module.exports = {
    run: async (port) => {
        await db.connect()
        let server = await app.listen(port)
        webSocket.init(server)
        console.log(`Server Listening ${port}`)
    },
    app
}

