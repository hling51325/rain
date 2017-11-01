let {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLString,
    GraphQLList,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLID
} = require('graphql/type')

let UserSchema = require('./lib/schema/user')

// localhost:3333/graphql?query={user(username: "test"){username}}

function getProjection(fieldASTs) {
    return fieldASTs.fieldNodes[0].selectionSet.selections.reduce((projections, selection) => {
        projections[selection.name.value] = true;
        return projections;
    }, {});
}

let userType = new GraphQLObjectType({
    name: 'user',
    description: 'user item',
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

let schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'root',
        fields: {
            user: {
                type: new GraphQLList(userType),
                args: {
                    username: {
                        username: 'username',
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, {username}, source, fieldASTs) => {
                    console.log(fieldASTs)
                    let projections = getProjection(fieldASTs)
                    return UserSchema.find({username}, projections)
                }
            }
        }
    })

});

module.exports = schema;