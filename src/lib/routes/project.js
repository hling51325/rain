module.exports = [
    {
        verb: 'get',
        url: '/projects/',
        method: getProjects
    },
    {
        verb: 'get',
        url: '/projects/:id/',
        method: getById
    },
    {
        verb: 'get',
        url: '/projects/:id/members/',
        method: getMembers
    },
    {
        verb: 'post',
        url: '/projects/',
        method: addProject
    },
    {
        verb: 'post',
        url: '/projects/:id/members/',
        method: addMember
    },
    {
        verb: 'delete',
        url: '/projects/:id/members/:memberId/',
        method: removeMember
    }
]

const Project = require('../domain/project')
const Auth = require('../domain/auth')
const errMsg = require('../service/errMsg')

async function getById(ctx, next) {
    let id = ctx.params.id
    let project = await Project.getById(id)
    ctx.response.body = project
}

async function getProjects(ctx, next) {
    let { userId } = ctx.session
    if (!userId) return '401'
    let projects = Project.get(userId)
    ctx.response.body = projects
}

async function getMembers(ctx, next) {
    let id = ctx.params.id
    let members = await Project.getMembers(id)
    ctx.response.body = members
}

async function addMember(ctx, next) {
    let projectId = ctx.params.id
    const userId = ctx.state.user._id
    let hasAuth = await Auth.hasAuth(userId, 'ADD_MEMBER', 'project', projectId)
    if (!hasAuth) throw errMsg['NO_AUTH']
    let member = await Project.addMember(projectId, userId)
    ctx.response.body = member
}

async function addProject(ctx, next) {
    let data = ctx.body
    let { userId } = ctx.session
    if (!data) return '404'
    if (!data.name) return '404'

    let project = await Project.addProject(data, userId)
    ctx.response.body = project
}

async function removeMember(ctx, next) {
    let { id: projectId, memberId } = ctx.params
    const userId = ctx.state.user._id
    let hasAuth = await Auth.hasAuth(userId, 'DELETE_MEMBER', 'project', projectId)
    if (!hasAuth) return errMsg['NO_AUTH']
    await Project.removeMember(memberId, userId, projectId)
    ctx.response.body = null
}