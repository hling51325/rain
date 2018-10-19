
const { Role } = require('../schema')

module.exports = {
    hasAuth,
    getDefault
}

async function hasAuth({ projectId, userId, authName }) {
    if (!projectId || !userId || !authName) return false
    return !!(await Role.findOne({ projectId, userId, auth: authName }))
}

async function getDefault(projectId) {
    return Role.findOne({ projectId, isDefault: true })
}