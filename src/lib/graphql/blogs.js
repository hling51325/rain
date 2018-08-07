let {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID,
    GraphQLUnionType,
    GraphQLInputObjectType,
    GraphQLInterfaceType
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
        title: {
            type: GraphQLString
        }
    },
    resolve: (root, where, source, fieldASTs) => {
        let projections = getProjection(fieldASTs)
        where.title = new RegExp(where.title)
        return Blog.get(where, projections)
    }
}

module.exports = user