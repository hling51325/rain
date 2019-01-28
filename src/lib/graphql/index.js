const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = gql(require('./typeDefs'))
const resolvers = require('./resolvers')

module.exports = app => {
    app.use(async (ctx, next) => {
        await next()
        new ApolloServer({
            typeDefs,
            resolvers,
            async context() {
                return ctx
            }
        }).applyMiddleware({ app })
    })
}