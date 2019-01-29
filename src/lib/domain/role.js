
const { Role } = require('../schema')

module.exports = {
    getDefault
}

async function getDefault(projectId) {
    return Role.findOne({ projectId, isDefault: true })
}