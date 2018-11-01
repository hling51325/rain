const upload = require('../service/multer')

module.exports = [
    {
        verb: 'put',
        url: '/user/:id/',
        before: [upload.single('avatar')],
        method: update
    }
]

const User = require('../domain/user')
const errMsg = require('../errMsg')

async function update(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    console.log(ctx.body)
    let user = await User.updateById(id, data)
    ctx.response.body = user
}
