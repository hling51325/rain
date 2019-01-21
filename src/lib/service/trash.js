const { Trash } = require('../schema')

module.exports = async (name, resource, userId) => {
    let data = {
        name,
        resource,
        createdBy: userId,
        createdAt: new Date()
    }
    return Trash.create(data)
}