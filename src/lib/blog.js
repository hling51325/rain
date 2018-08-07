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

function get(where, projection) {
    return Blog.find(where, projection)
}

function updateById(id, data) {
    return Blog.findOneAndUpdate({_id: id}, data, {new: true})
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