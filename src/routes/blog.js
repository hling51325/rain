module.exports = (router, middleware) => {
    router.get('/blogs', getBlogs)
    router.get('/blog/:id', getBlog)
    router.post('/blog', addBlog)
    router.patch('/blog/:id', updateBlog)
    router.delete('/blog/:id', deleteBlog)
};

const Blog = require('../lib/blog')
const makeFilter = require('../lib/service/makeFilter')

function getBlogs(req, res) {
    let filter = makeFilter(req)
    Blog.get(filter.where)
        .then(blogs => {
            res.json(blogs)
        })
}

function getBlog(req, res) {
    let id = req.params.id
    Blog.getById(id)
        .then(blog => {
            res.json(blog)
        })
}

function addBlog(req, res) {
    let data = req.body
    let userId = req.session.userId
    data.createdBy = userId
    data.updatedBy = userId
    Blog.add(data)
        .then(blog => {
            res.json(blog)
        })
}

function updateBlog(req, res) {
    let id = req.params.id
    let data = req.body
    Blog.updateById(id, data)
        .then(blog => {
            res.json(blog)
        })
}

function deleteBlog(req, res) {
    let id = req.params.id
    Blog.removeById(id)
        .then(() => {
            res.sendStatus(204)
        })
}