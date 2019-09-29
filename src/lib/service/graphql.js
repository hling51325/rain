const { ApolloServer, gql } = require('apollo-server-koa')
const typeDefs = gql(require('../graphql/typeDefs'))
const resolvers = require('../graphql/resolvers')
const errMsg = require('./errMsg')

module.exports = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ ctx }) => {
        if (!ctx.isAuthenticated()) throw errMsg['NO_AUTH']
        return ctx
    },
    // path: "/graphql",
    playground: {
        settings: {
            "request.credentials": "include"
        }
    }
}).getMiddleware()