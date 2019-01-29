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
                return ctx
            }
        }).applyMiddleware({ app })
    })
}