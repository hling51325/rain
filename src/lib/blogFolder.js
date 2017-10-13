module.exports = {
    removeById,
    get,
    getById,
    updateById,
    applyFilter,

    add,
    findOne,
    remove
}

const BlogFolder = require('./schema/blogFolder')

function get(where) {
    return BlogFolder.find(where)
}

function updateById(id, data) {
    return BlogFolder.findOneAndUpdate({_id: id}, data)
}

function findOne(where) {
    return BlogFolder.findOne(where)
}

function getById(id) {
    let where = {
        _id: id
    }
    return findOne(where)
}

function applyFilter(filter) {
}

function add(data) {
    let blogFolder = new BlogFolder(data)
    return blogFolder.save()
}

function removeById(id) {
    let where = {
        _id: id
    }
    return remove(where)
}

function remove(where) {
    return BlogFolder.remove(where)
}