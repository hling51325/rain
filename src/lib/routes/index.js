const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});
const rootPath = path.join(__dirname, './')
let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')
let noAuthRoutes = ['auth', 'touch']

files.forEach(route => {
    require(path.join(rootPath, route))(router)
})

async function isAuth(ctx, next) {
    if (ctx.isAuthenticated()) {
        await next()
    } else {
        ctx.redirect('/')
    }
}

module.exports = router