module.exports = (router, middleware) => {
    router.get('/blogs', getBlogs)
    router.get('/blogs/:id', getBlog)
    router.post('/blogs', addBlog)
    router.put('/blogs/:id', updateBlog)
    router.delete('/blogs/:id', deleteBlog)
};

const Blog = require('../domain/blog')

function getBlogs(ctx, next) {
    ctx.response.body = []
}

async function getBlog(ctx, next) {
    let { id } = ctx.params
    let blog = await Blog.getById(id)
    ctx.response.body = blog
}

async function addBlog(ctx, next) {
    let data = crx.body
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