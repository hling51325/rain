const { Trash } = require('../schema')

module.exports = async (collection, resource, userId) => {
    let data = {
        collection,
        resource,
        createdBy: userId,
        createdAt: new Date()
    }
    return Trash.create(data)
}