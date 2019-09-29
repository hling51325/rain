const fs = require('fs')
const path = require('path')
const config = require('config');

module.exports = async (ctx, next) => {
    try {
        await next()
        if (ctx.status === 404) {
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream(path.join(config.util.getEnv('NODE_CONFIG_DIR'), '../public/dist/index.html'))
        }
    } catch (err) {
        if (err.stack) console.log(err.stack)
        ctx.status = err.status || 500
        ctx.response.body = err
    }
}