module.exports = []
// module.exports = (router) => {
//     router.get('/projects', getProjects)
//     router.get('/projects/:id', getById)
//     router.get('/projects/:id/members', getMembers)
//     router.post('/projects', addProject)
//     router.post('/projects/:id/members', addMember)
//     router.delete('/projects/:id/members/:memberId', removeMember)
// }

// let Project = require('../domain/project')
// let Role = require('../domain/role')

// async function getById(ctx, next) {
//     let id = ctx.params.id
//     let project = await Project.getById(id)
//     ctx.response.body = project
// }

// async function getProjects(ctx, next) {
//     let { userId } = ctx.session
//     if (!userId) return '401'
//     let projects = Project.get(userId)
//     ctx.response.body = projects
// }

// async function getMembers(ctx, next) {
//     let id = ctx.params.id
//     let members = await Project.getMembers(id)
//     ctx.response.body = members
// }

// async function addMember(ctx, next) {
//     let projectId = ctx.params.id
//     let { userId } = ctx.session
//     if (!userId) return '401'
//     let hasAuth = await Role.hasAuth({ projectId, userId, authName: 'member-add' })
//     if (!hasAuth) return '401'
//     let member = await Project.addMember(projectId, userId)
//     ctx.response.body = member
// }

// async function addProject(ctx, next) {
//     let data = ctx.body
//     let { userId } = ctx.session
//     if (!data) return '404'
//     if (!data.name) return '404'
//     if (!userId) return '401'

//     let project = await Project.addProject(data, userId)
//     ctx.response.body = project
// }

// async function removeMember(ctx, next) {
//     let { id, memberId } = ctx.params
//     let { userId } = ctx.session
//     if (!userId) return '401'
//     let hasAuth = await Role.hasAuth({ id, userId, authName: 'member-remove' })
//     if (!hasAuth) return '401'
//     await Project.removeMember(memberId)
//     ctx.response.body = null
// }