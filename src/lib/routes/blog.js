module.exports = (router, middleware) => {
    router.get('/blogs', getBlogs)
    router.get('/blogs/:id', getBlog)
    router.post('/blogs', addBlog)
    router.put('/blogs/:id', updateBlog)
    router.delete('/blogs/:id', deleteBlog)
};


function getBlogs(ctx, next) {
}

function getBlog(ctx, next) {
}

function addBlog(ctx, next) {
}

function updateBlog(ctx, next) {
}

function deleteBlog(ctx, next) {
}