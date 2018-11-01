const upload = require('../service/multer')

module.exports = (router, middleware) => {
    router.put('/user/:id', upload.single('avatar'), update)
};

const User = require('../domain/user')
const errMsg = require('../errMsg')

async function update(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    console.log(ctx.body)
    let user = await User.updateById(id, data)
    ctx.response.body = user
}
