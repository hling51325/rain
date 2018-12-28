
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
const User = require('../domain/user')
const errMsg = require('../service/errMsg')

async function me(ctx, next) {
    if (!ctx.isAuthenticated()) return ctx.response.body = {}
    let user = ctx.state.user.toJSON()
    ctx.response.body = user
}

async function signIn(ctx, next) {
    return passport.authenticate('local', function (err, user, info, status) {
        if (!user) throw errMsg['USER_NONE']
        ctx.body = user
        return ctx.login(user)
    })(ctx)
}

async function signOut(ctx) {
    ctx.logout();
    ctx.redirect('/');
}

async function signUp(ctx, next) {
    const { username, password } = ctx.request.body
    if (!username || !password) throw errMsg('user.none')
    let isExist = await User.isExist({ username })
    if (isExist) throw errMsg['USER_EXIST']

    await User.signUp({ username, password })
    return passport.authenticate('local', function (err, user, info, status) {
        if (!user) throw errMsg['USER_NONE']
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