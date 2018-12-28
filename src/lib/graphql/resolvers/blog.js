const { Blog } = require('../../schema')

module.exports = {
    Blog: {

    },
    Query: {
        blogs: (root, args, context, info) => {
            let { _id } = context.state.user
            return Blog.find({})
        },
        blog: (root, args) => {
            return Blog.findOne(args)
        }
    },
    Mutation: {
        async addBlog(root, args, context, info) {
            let { _id } = context.state.user
            let data = {
                createdBy: _id,
                updatedBy: _id,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            return Blog.create(data)
        }
    }
}
