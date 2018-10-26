

const { Project, Member, User } = require('../schema')
const { defaultRoles } = require('../../config/global')

module.exports = {
    get,
    getById,
    getByIdExpand,
    getMembers,
    addMember,
    addProject,
    removeProject,
    removeMember
}

const Role = require('./role')

function getById(_id) {
    return Project.findOne({ _id })
}

async function getByIdExpand(_id) {
    let project = await getById(_id)
    let members = await Member.find({ projectId: _id })
    project.members = members
    return project
}

async function get(userId) {
    let members = await Member.find({ userId })
    let projectIds = members.map(member => member.proejectId)
    return Project.find({ _id: { $in: projectIds } })
}

async function getMembers(projectId) {
    let members = await Member.find({ projectId })
    let userIds = members.map(member => member.userId)
    let users = await User.find({ _id: { $in: userIds } })
    return members.map(member => {
        member.user = users.find(user => `${user._id}` === `${member.userId}`)
        return member
    })
}

async function addMember(projectId, userId) {
    let defaultRole = await Role.getDefault(projectId)
    let member = await Member.create({ projectId, userId, roleId: defaultRole._id })
    return member
}

async function addProject(data, userId) {
    let project = await Project.create(data)

    try {
        let roles = defaultRoles.map(role => {
            role.projectId = project._id
            return role
        })
        let newRoles = await Role.insertMant(roles)
        let admin = newRoles.find(role => role.name = 'admin')
        await Member.create({ projectId: project._id, userId, roleId: admin._id })
    } catch (e) {
        await removeProject(project._id)
        return "create project failed"
    } Ï

    return project
}

async function removeProject(projectId) {
    if (!projectId) return
    await Project.remove({ _id: projectId })
    await Role.remove({ projectId })
    await Member.remove({ projectId })
}

async function removeMember(_id) {
    return Member.remove({ _id })
}