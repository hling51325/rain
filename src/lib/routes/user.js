const upload = require('../service/multer')

module.exports = (router, middleware) => {
    router.get('/me', me)
    router.put('/user/:id', upload.single('avatar'), update)
};

const User = require('../domain/user')
const errMsg = require('../errMsg')

async function me(ctx, next) {
    if (!ctx.isAuthenticated()) ctx.response.body = {}
    let user = ctx.state.user.toJSON()
    ctx.response.body = user
}

async function update(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    console.log(ctx.body)
    let user = await User.updateById(id, data)
    ctx.response.body = user
}
