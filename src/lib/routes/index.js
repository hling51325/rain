const fs = require('fs')
const path = require('path')
const Router = require('koa-router');

const router = new Router({
    prefix: '/api'
});
const rootPath = path.join(__dirname, './')
let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')

files.forEach(route => {
    require(path.join(rootPath, route))(router)
})

module.exports = router