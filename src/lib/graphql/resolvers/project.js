const { User, Project: ProjectSchema } = require('../../schema')
const { Project } = require('../../domain')

module.exports = {
    Project: {

    },
    Query: {
        projects: (root, args, ctx, info) => {
            return ProjectSchema.find({})
        },
        project: (root, args) => {
            return ProjectSchema.findOne(args)
        }
    },
    Mutation: {
        addProject(_, args, ctx) {
            const userId = ctx.state.user._id
            let data = {
                ...args,
                createdBy: userId,
                updatedBy: userId,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            return Project.addProject(data, userId)
        },
        updateProject(_, args, ctx) {
            const userId = ctx.userId
            let data = {
                ...args,
                updatedBy: userId,
                updatedAt: Date.now()
            }
            return ProjectSchema.findOneAndUpdate({ _id: ctx.params._id }, data)
        }
    }
}