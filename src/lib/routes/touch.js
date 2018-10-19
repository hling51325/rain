
module.exports = (router) => {
    router.get('/touch', touch)
}

function touch(ctx, next) {
    ctx.response.body = "hello world"
}