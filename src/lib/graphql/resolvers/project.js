const Project = require('../../domain/project')

module.exports = {
    Project: {

    },
    Query: {
        projects: (root, args, context, info) => {
            let { userId } = context.session
            return Project.get(userId)
        },
        project: (root, args) => {
            return Project.getById(args)
        }
    },
    Mutation: {
        addProject: (root, args, context, info) => {
            let { userId } = context.session
            // TODO
            let data = {}
            return Project.addProject(data, userId)
        }
    }
}
