// const upload = require('../service/multer')

module.exports = (router, middleware) => {
    router.post('/sign-in', signIn);
    router.get('/sign-out', signOut);
    router.get('/me', me)
    router.post('/sign-up', signUp);
    // router.put('/user/:id', upload.single('avatar'), updateUser)
};

const User = require('../domain/user')
// const makeFilter = require('../lib/service/makeFilter')

async function signIn(ctx, next) {
    const { username, password } = ctx.body
    if (!username || !password) ctx.throw(400, 'Error Message');
    let user = await User.signIn(username, password)
    if (!user) ctx.throw(400, 'Error Message');
    ctx.session.userId = user._id
    ctx.session.username = user.username
    ctx.response.body = user
}

function signOut(ctx, next) {
    delete ctx.session.userId
    delete ctx.session.username
    ctx.status = 200
}

async function me(ctx, next) {
    let userId = ctx.session.userId
    let user = await User.signed(userId)
    ctx.response.body = user
}

async function signUp(ctx, next) {
    const { username, password } = ctx.body
    if (!username || !password) return 400

    let user = await User.signUp({ username, password })
    ctx.session.userId = user._id
    ctx.session.username = user.username
    ctx.response.body = user
}
