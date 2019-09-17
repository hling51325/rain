const upload = require('../service/multer')

module.exports = [
    {
        verb: 'put',
        url: '/user/:id/',
        methods: [upload.single('avatar'), update]
    }
]

const User = require('../domain/user')

async function update(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    let user = await User.updateById(id, data)
    ctx.response.body = user
}
