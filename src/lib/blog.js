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

const Blog = require('./schema/blog')

function get(where) {
    return Blog.find(where)
}

function updateById(id, data) {
    return Blog.findOneAndUpdate({_id: id}, data)
}

function findOne(where) {
    return Blog.findOne(where)
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
    let blog = new Blog(data)
    return blog.save()
}

function removeById(id) {
    let where = {
        _id: id
    }
    return remove(where)
}

function remove(where) {
    return Blog.remove(where)
}