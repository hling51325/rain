const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});
const rootPath = path.join(__dirname, './')
let files = fs.readdirSync(rootPath)
    .map(file => file.replace('.js', ''))
    .filter(file => file !== 'index')
let noAuthRoutes = ['auth', 'touch']

files.forEach(file => {
    let apis = require(path.join(rootPath, file))
    apis.forEach(api => {
        api = fillApi(api)
        api.middlewares.unshift(parameterCombinder)
        if (!noAuthRoutes.includes(file)) api.middlewares.unshift(isAuth)
        router[api.verb](api.url, ...api.middlewares)
    })
})

module.exports = router

async function isAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
        await next()
    } else {
        ctx.redirect('/') // TODO: if no Auth return ?
    }
}

function fillApi(api) {
    if (!api.verb) throw 'no verb'
    if (!api.url) throw 'no url'
    api.methods = api.methods || api.method || []
    api.middlewares = api.middlewares || []
    // befores before / afters after / method methods / ---> array ?
    if (api.before) {
        api.middlewares = api.middlewares.concat(api.before)
    }
    api.middlewares = api.middlewares.concat(api.methods)
    if (api.after) {
        api.middlewares = api.middlewares.concat(api.after)
    }
    return api
}

async function parameterCombinder(ctx, next) {
    let userId = ctx.state.user && ctx.state.user._id || null
    let commonInfo = {
        createdBy: userId,
        updatedBy: userId,
        createdAt: Date.now(),
        updatedAt: Date.now()
    }
    ctx.data = { ...ctx.params, ...ctx.body, ...commonInfo, userId }
    await next()
}