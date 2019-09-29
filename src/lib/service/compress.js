const compress = require('koa-compress')
const zlib = require('zlib')

module.exports = compress({
    threshold: 1024,
    flush: zlib.Z_SYNC_FLUSH
})