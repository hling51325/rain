const { ObjectId } = require('../../service/db')
const { merge } = require('lodash')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

let resolverModules = [
    require('./user'),
    require('./word')
]

const Date = new GraphQLScalarType({
    name: 'Date',
    description: 'Date Type',
    serialize(value) {
        return value.getTime() // value sent to the client
    },
    parseValue(value) {
        return new Date(value)  // value from the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.INT) {
            return new Date(ast.value) // ast value is always in string format
        }
        return null;
    }
});

const ObjectIdType = new GraphQLScalarType({
    name: 'ObjectId',
    description: 'ObjectId Type',
    serialize(value) {
        return value.toString()
    },
    parseValue(value) {
        return new ObjectId(value)  // value from the client
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return new ObjectId(ast.value) // ast value is always in string format
        }
        return null;
    }
});

let resolvers = {
    ObjectId: ObjectIdType,
    Date,
    Query: {
        touch() {
            return {
                index: 'Hello world'
            }
        }
    }
}

resolverModules.forEach(resolver => {
    merge(resolvers, resolver)
})

module.exports = resolvers