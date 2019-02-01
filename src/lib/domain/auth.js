const { Auth } = require('../schema')

module.exports = {
    hasAuth
}

async function hasAuth(userId, auth, scope, scopeId) {
    // 通过直接传入ctx，设计smart校验机制？
    // keyId keyScope
    if (!userId || !auth) return false
    return !!(await Auth.findOne({ userId, auths: auth, scope, scopeId }))
}