
const { Role, Member, Auth } = require('../schema')

module.exports = {
    getDefault,
    updateRole
}

async function getDefault(projectId) {
    return Role.findOne({ projectId, isDefault: true })
}

async function updateRole(roleId, data, projectId) {
    if (data.auths) {
        await updateAuths(roleId, projectId)
    }
    const role = await Role.findOneAndUpdate({ _id: roleId }, data)
    return role
    async function updateAuths(roleId, projectId) {
        let userIds = Member.find({ projectId, roleId }).distinct('userId')
        await Auth.updateMany({ userId: { $in: userIds } }, { auths: data.auths })
    }
}