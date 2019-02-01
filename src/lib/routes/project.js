module.exports = [
    {
        verb: 'get',
        url: '/projects/',
        methods: [getProjects]
    },
    {
        verb: 'get',
        url: '/projects/:id/',
        methods: [canRead, getById]
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
        verb: 'delete',
        url: '/projects/:id',
        method: [canDeleteProject, deleteProject]
    },
    {
        verb: 'post',
        url: '/projects/:id/members/',
        methods: [canAddMember, addMember]
    },
    {
        verb: 'delete',
        url: '/projects/:id/members/:memberId/',
        methods: [canDeleteMember, removeMember]
    },
    {
        verb: 'get',
        url: '/projects/:id/roles/',
        methods: [canRead, getRoles]
    },
    {
        verb: 'post',
        url: '/projects/:id/roles/',
        methods: [canUpdateProject, addRole]
    },
    {
        verb: 'put',
        url: '/projects/:id/roles/:roleId/',
        methods: [canUpdateProject, updateRole]
    },
    {
        verb: 'delete',
        url: '/projects/:id/roles/:roleId/',
        methods: [canUpdateProject, deleteRole]
    }
]

const Project = require('../domain/project')
const Auth = require('../domain/auth')
const errMsg = require('../service/errMsg')
const { Role } = require('../schema')
const fields = require('../service/fields')

async function canRead(ctx, next) {
    const projectId = ctx.params.id
    const userId = ctx.state.user._id
    const hasAuth = await Auth.hasAuth(userId, 'READ_PROJECT', 'project', projectId)
    if (!hasAuth) throw errMsg['NO_AUTH']
    await next()
}

async function canAddMember(ctx, next) {
    const projectId = ctx.params.id
    const hasAuth = await Auth.hasAuth(userId, 'ADD_MEMBER', 'project', projectId)
    if (!hasAuth) throw errMsg['NO_AUTH']
    await next()
}

async function canDeleteMember(ctx, next) {
    const projectId = ctx.params.id
    const userId = ctx.state.user._id
    const hasAuth = await Auth.hasAuth(userId, 'DELETE_MEMBER', 'project', projectId)
    if (!hasAuth) return errMsg['NO_AUTH']
    await next()
}

async function canUpdateProject(ctx, next) {
    const projectId = ctx.params.id
    const userId = ctx.state.user._id
    const hasAuth = await Auth.hasAuth(userId, 'UPDATE_PROJECT', 'project', projectId)
    if (!hasAuth) return errMsg['NO_AUTH']
    await next()
}

async function canDeleteProject(ctx, next) {
    const projectId = ctx.params.id
    const userId = ctx.state.user._id
    const hasAuth = await Auth.hasAuth(userId, 'DELETE_PROJECT', 'project', projectId)
    if (!hasAuth) return errMsg['NO_AUTH']
    await next()
}

async function getById(ctx, next) {
    let projectId = ctx.params.id
    let project = await Project.getById(projectId)
    ctx.response.body = project
}

async function getProjects(ctx, next) {
    let { _id: userId } = ctx.state.user
    let projects = Project.get(userId)
    ctx.response.body = projects
}

async function getMembers(ctx, next) {
    let id = ctx.params.id
    let members = await Project.getMembers(id)
    ctx.response.body = members
}

async function addMember(ctx, next) {
    const projectId = ctx.params.id
    const userId = ctx.state.user._id
    let member = await Project.addMember(projectId, userId)
    ctx.response.body = member
}

async function addProject(ctx, next) {
    let data = ctx.body
    let { _id: userId } = ctx.state.user
    if (!data || !data.name) throw errMsg['MISS_PARAMS']

    let project = await Project.addProject(data, userId)
    ctx.response.body = project
}

async function deleteProject(ctx, next) {
    const projectId = ctx.params.id
    const project = await Project.removeProject(projectId)
    ctx.response.body = project
}

async function removeMember(ctx, next) {
    const { id: projectId, memberId } = ctx.params
    const userId = ctx.state.user._id
    await Project.removeMember(memberId, userId, projectId)
    ctx.response.body = null
}

async function getRoles(ctx, next) {
    const { id: projectId } = ctx.params
    let roles = await Role.find({ projectId })
    ctx.response.body = roles
}

async function addRole(ctx, next) {
    const data = fields(ctx.data, 'role', 'create')
    const role = await Role.create(data)
    ctx.response.body = role
}

async function updateRole(ctx, next) {
    const { roleId } = ctx.params
    const data = fields(ctx.data, 'role', 'update')
    const role = await Role.findOneAndUpdate({ _id: roleId }, data)
    ctx.response.body = role
}

async function deleteRole(ctx, next) {
    const { roleId } = ctx.params
    const role = await Role.findOneAndDelete({ _id: roleId })
    ctx.response.body = role
}