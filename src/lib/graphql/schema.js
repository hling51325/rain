let {
    GraphQLObjectType,
    GraphQLSchema
} = require('graphql')

// localhost:3333/graphql?query={user(username: "test"){username}}

const user = require('./user')
const blogs = require('./blogs')

let queryType = new GraphQLObjectType({
    name: 'Query',
    fields: {
        user,
        blogs
    }
})

let schema = new GraphQLSchema({query: queryType});

module.exports = schema;