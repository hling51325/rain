
module.exports = (router) => {
    router.get('/me', me)

    router.post('/sign-in', signIn);
    router.get('/sign-out', signOut);
    router.post('/sign-up', signUp);

    router.get('/auth/:site/callback', oauthCallback)
    router.get('/auth/:site', oauth)
}
const passport = require('koa-passport')
const errMsg = require('../errMsg')

async function me(ctx, next) {
    if (!ctx.isAuthenticated()) ctx.response.body = {}
    let user = ctx.state.user.toJSON()
    ctx.response.body = user
}

async function signIn(ctx, next) {
    return passport.authenticate('local', function (err, user, info, status) {
        if (!user) throw errMsg('user.none')
        ctx.body = user
        return ctx.login(user)
    })(ctx)
}

async function signOut(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/');
    } else {
        throw errMsg('auth.noAuth')
    }
}

// todo
async function signUp(ctx, next) {
    const { username, password } = ctx.body
    if (!username || !password) throw errMsg('user.none')
    let isExist = await User.isExist({ username })
    if (isExist) throw errMsg('user.exist')

    await User.signUp({ username, password })
    return passport.authenticate('local', function (err, user, info, status) {
        if (!user) throw errMsg('user.none')
        ctx.body = user
        return ctx.login(user)
    })(ctx)
}

async function oauth(ctx, next) {
    const { site } = ctx.params
    return passport.authenticate(site)(ctx)
}

async function oauthCallback(ctx, next) {
    const { site } = ctx.params
    return passport.authenticate(site, (err, user, info, status) => {
        ctx.body = user
        return ctx.login(user)
    })(ctx, next)
}