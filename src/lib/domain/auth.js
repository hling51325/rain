const { Auth } = require('../schema')

module.exports = {
    hasAuth
}

function hasAuth(userId, auth, scope, scopeId) {
    if (!userId || !auth) return false
    return !!(await Auth.findOne({ userId, auths: auth, scope, scopeId }))
}