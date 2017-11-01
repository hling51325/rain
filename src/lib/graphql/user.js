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
let User = require('../user')

let userType = new GraphQLObjectType({
    name: 'User',
    description: 'user schema',
    fields: () => ({
        _id: {
            type: GraphQLID
        },
        uid: {
            type: GraphQLInt
        },
        username: {
            type: GraphQLString
        },
        nickname: {
            type: GraphQLString
        }
    })
});

let user = {
    type: userType,
    args: {
        username: {
            type: GraphQLString
        },
        uid: {
            type: GraphQLInt
        }
    },
    resolve: (root, where, source, fieldASTs) => {
        let projections = getProjection(fieldASTs)
        return User.getOne(where, projections)
    }
}

module.exports = user