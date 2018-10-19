const { User, Word } = require('../../schema')
const { passwordCrypto } = require('../../service/util')

module.exports = {
    User: {
        words: (user) => Word.find({ createdBy: user._id })
    },
    Query: {
        users: (root, args, context, info) => {
            return User.find({})
        },
        user: (root, args) => {
            return User.findOne(args)
        }
    },
    Mutation: {
        async addUser(_, args, ctx, info) {
            let data = args
            let user = await User.findOne({ username: data.username })
            if (user) return new Error('user exists')
            data.password = passwordCrypto(data.password)
            return User.create(data)
        }
    }
}