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
        addWord(_, args) {
            let data = args

            // todo:  add session
            return Word.create(data)
        }
    }
}