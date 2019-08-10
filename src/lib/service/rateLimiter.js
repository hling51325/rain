const ratelimit = require('koa-ratelimit')
const Redis = require('ioredis')
const { RATE_LIMIT } = require('config')

module.exports = app => {
    app.use(ratelimit({
        db: new Redis(),
        duration: RATE_LIMIT.DURATION, // ms
        errorMessage: 'Sometimes You Just Have to Slow Down.',
        id: (ctx) => ctx.ip,
        whitelist: (ctx) => {
            return ctx.ip === '::1'
        },
        headers: {
            remaining: 'Rate-Limit-Remaining',
            reset: 'Rate-Limit-Reset',
            total: 'Rate-Limit-Total'
        },
        max: RATE_LIMIT.MAX,
        disableHeader: false,
    }))
}