const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = gql(require('./typeDefs'))
const resolvers = require('./resolvers')
const errMsg = require('../service/errMsg')

module.exports = app => {
    
    // app.use(new ApolloServer({
    //     typeDefs,
    //     resolvers,
    //     context: ({ ctx }) => {
    //         console.log(ctx.isAuthenticated())
    //         if (!ctx.isAuthenticated()) throw errMsg['NO_AUTH']
    //         return ctx
    //     }
    // }).getMiddleware())

    app.use(async (ctx, next) => {
        await next()
        new ApolloServer({
            typeDefs,
            resolvers,
            context() {
                // console.log(ctx.isAuthenticated())
                if(!ctx.isAuthenticated()) throw errMsg['NO_AUTH']
                return ctx
            }
        }).applyMiddleware({ app })
    })
}