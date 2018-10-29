const upload = require('../service/multer')

module.exports = (router, middleware) => {
    router.post('/sign-in', signIn);
    router.get('/sign-out', signOut);
    router.get('/me', me)
    router.post('/sign-up', signUp);
    router.put('/user/:id', upload.single('avatar'), update)
};

const User = require('../domain/user')
const passport = require('koa-passport')
const errMsg = require('../errMsg')

async function signIn(ctx, next) {
    return passport.authenticate('local', function (err, user, info, status) {
        if (!user) throw errMsg('user.none')
        ctx.body = user
        return ctx.login(user)
    })(ctx)
}

function signOut(ctx, next) {
    ctx.session = null
    ctx.status = 200
}

async function me(ctx, next) {
    let auth = ctx.isAuthenticated()
    let userId = ctx.session.userId
    let user = await User.signed(userId)
    ctx.response.body = user
}

async function signUp(ctx, next) {
    const { username, password } = ctx.body
    if (!username || !password) throw errMsg('user.none')
    let isExist = await User.isExist({ username })
    if (isExist) throw errMsg('user.exist')

    let user = await User.signUp({ username, password })
    ctx.session = {
        userId: user._id,
        username: user.username
    }
    ctx.response.body = user
}

async function update(ctx, next) {
    let { id } = ctx.params
    let data = ctx.body
    console.log(ctx.body)
    let user = await User.updateById(id, data)
    ctx.response.body = user
}
