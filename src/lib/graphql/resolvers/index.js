const { ObjectId } = require('../../service/db')
const { merge } = require('lodash')

const { GraphQLScalarType } = require('graphql')
const { Kind } = require('graphql/language')

const path = require('path')
const fs = require('fs')

const rootPath = path.join(__dirname, './');
const files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')

const resolverModules = files.reduce((curr, resolver) => {
    return curr.concat(require(`./${resolver}`))
}, [])

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

const resolvers = {
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