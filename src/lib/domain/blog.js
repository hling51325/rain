const { Blog } = require('../schema')

module.exports = {
    getById,
    getBlogs,
    addBlog,
    updateById,
    removeById
}

function getById(id) {
    return Blog.findById(id)
}

function getBlogs() {

}

function addBlog(data) {
    if (!data.author) {

    }
    return Blog.create(data)
}

function updateById(id, data) {
    return Blog.update({ _id: id }, data)
}

function removeById(id) {
    return Blog.remove({ _id: id })
}