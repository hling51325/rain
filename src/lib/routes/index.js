const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});
const rootPath = path.join(__dirname, './')
let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')
let noAuthRoutes = ['auth', 'touch']

files.forEach(file => {
    let apis = require(path.join(rootPath, file))
    apis.forEach(api => {
        api = fillApi(api)
        router[api.verb](api.url, api.method)
    })
})

module.exports = router

async function isAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
        await next()
    } else {
        ctx.redirect('/')
    }
}

function fillApi(api) {
    if (!api.verb) throw 'no verb'
    if (!api.url) throw 'no url'
    if (!api.method) throw 'no method'
    return api
}