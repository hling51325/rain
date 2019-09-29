const session = require('koa-session')
const SessionStore = require('./sessionStore')
const { ObjectId } = require('../db')

module.exports = app => session({
    renew: true,
    genid: () => new ObjectId(),
    store: new SessionStore({
        expires: 86400 * 7 // 7 days
    })
}, app)