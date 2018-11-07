
module.exports = [
    {
        verb: 'get',
        url: '/me/',
        method: me
    },
    {
        verb: 'post',
        url: '/sign-in/',
        method: signIn
    },
    {
        verb: 'get',
        url: '/sign-out/',
        method: signOut
    },
    {
        verb: 'post',
        url: '/sign-up/',
        method: signUp
    },
    {
        verb: 'get',
        url: '/auth/:site/callback/',
        method: oauthCallback
    },
    {
        verb: 'get',
        url: '/auth/:site/',
        method: oauth
    }
]

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