const { User, Word } = require('../../schema')

module.exports = {
    Word: {

    },
    Query: {
        words: (root, args, context, info) => {
            return Word.find({})
        },
        word: (root, args) => {
            return Word.findOne(args)
        }
    },
    Mutation: {
        addWord(_, args, ctx) {
            const userId = ctx.userId
            let data = {
                ...args,
                createdBy: userId,
                updatedBy: userId,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            return Word.create(data)
        }
    }
}