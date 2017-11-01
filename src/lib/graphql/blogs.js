let {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} = require('graphql')

const getProjection = require('../service/getProjection')
let Blog = require('../blog')

let blogType = new GraphQLObjectType({
    name: 'Blog',
    description: 'Blog schema',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        title: {
            type: GraphQLString
        },
        content: {
            type: GraphQLString
        }
    })
});

let user = {
    type: new GraphQLList(blogType),
    args: {

    },
    resolve: (root, {}, source, fieldASTs) => {
        let projections = getProjection(fieldASTs)
        return Blog.get({}, projections)
    }
}

module.exports = user