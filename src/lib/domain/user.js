
const { User } = require('../schema')
const { passwordCrypto } = require('../service/util')

module.exports = {
    signIn,
    signed,
    signUp,
    getById,
    updateById,
    error
}

function getById(_id, projection) {
    return User.findOne({ _id }, projection)
}

function updateById(id, data, options) {
    return User.findOneAndUpdate(id, data, options)
}

function signIn(username, password) {
    password = passwordCrypto(password)
    return User.findOne({ username, password })
}

function error(code) {

}

function signed(userId) {
    return getById(userId, ['-password'])
}

function signUp(data) {
    data.password = passwordCrypto(data.password)
    return User.create(data)
}