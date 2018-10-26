
module.exports = (router) => {
    router.post('/login', login)
    router.get('/auth/:site/callback', oauthCallback)
    router.get('/auth/:site', oauth)
    router.get('/logout', logout)
}
const passport = require('koa-passport')

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
        ctx.body = { success: false };
        ctx.throw(401);
    }
}

async function oauth(ctx, next) {
    const { site } = ctx.params
    passport.authenticate(site)(ctx)
}

async function oauthCallback(ctx, nrxt) {
    const { site } = ctx.params
    passport.authenticate(site, {
        successRedirect: '/',
        failureRedirect: '/'
    })(ctx)
}