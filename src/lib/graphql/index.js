const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = gql(require('./typeDefs'))
const resolvers = require('./resolvers')
const errMsg = require('../service/errMsg')

module.exports = app => {
    app.use(async (ctx, next) => {
        await next()
        new ApolloServer({
            typeDefs,
            resolvers,
            async context() {
                if(!ctx.isAuthenticated()) throw errMsg['NO_AUTH']
                ctx.userId = ctx.state.user._id
                return ctx
            }
        }).applyMiddleware({ app })
    })
}