
module.exports = (router) => {
    router.post('/login', login)
    router.get('/auth/:site/callback', oauthCallback)
    router.get('/auth/:site', oauth)
    router.get('/logout', logout)
}
const passport = require('koa-passport')
const errMsg = require('../errMsg')

function login(ctx) {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/'
    })(ctx)
}

async function logout(ctx) {
    if (ctx.isAuthenticated()) {
        ctx.logout();
        ctx.redirect('/');
    } else {
        throw errMsg('auth.noAuth')
    }
}

async function oauth(ctx, next) {
    const { site } = ctx.params
    passport.authenticate(site)(ctx)
}

async function oauthCallback(ctx, next) {
    const { site } = ctx.params
    passport.authenticate(site, (err, user, info, status) => {
        ctx.body = { err, user, info, status }
        return ctx.login(user)
    })(ctx, next)
}