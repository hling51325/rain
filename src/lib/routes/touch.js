
module.exports = [
    {
        verb: 'get',
        url: '/touch/',
        method: touch
    }
]

function touch(ctx, next) {
    ctx.response.body = "hello world"
}