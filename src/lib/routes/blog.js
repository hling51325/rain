module.exports = [
    {
        verb: 'get',
        url: '/blogs/',
        method: getBlogs
    },
    {
        verb: 'get',
        url: '/blogs/:id/',
        method: getBlog
    },
    {
        verb: 'post',
        url: '/blogs/',
        method: addBlog
    },
    {
        verb: 'put',
        url: '/blogs/:id/',
        method: updateBlog
    },
    {
        verb: 'delete',
        url: '/blogs/:id/',
        method: deleteBlog
    }
]

const Blog = require('../domain/blog')
const { Blog: BlogSchema } = require('../schema')

async function getBlogs(ctx, next) {
    let blogs = await BlogSchema.find({})
    ctx.response.body = blogs
}

async function getBlog(ctx, next) {
    let { id } = ctx.params
    let blog = await Blog.getById(id)
    ctx.response.body = blog
}

async function addBlog(ctx, next) {
    let data = ctx.body
    let blog = await Blog.addBlog(data)
    ctx.response.body = blog
}

async function updateBlog(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    let blog = await Blog.updateById(id, data)
    ctx.response.body = blog
}

async function deleteBlog(ctx, next) {
    let { id } = ctx.params
    await Blog.removeById(id)
    ctx.status = 204
}