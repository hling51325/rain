module.exports = app => {
    app.use(async (ctx, next) => {
        const userId = ctx.state.user._id
        ctx.userId = ctx.state.user._id
        ctx.info = {
            createdBy: userId
        }
    })
    next()
}