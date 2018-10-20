
const { User } = require('../schema')
const { passwordCrypto } = require('../service/util')

module.exports = {
    signIn,
    signed,
    signUp,
    getById,
    updateById,
    isExist
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

async function isExist(where) {
    return !!(await User.findOne(where))
}

function signed(userId) {
    return getById(userId, ['-password'])
}

async function signUp(data) {
    data.password = passwordCrypto(data.password)
    let user = await User.create(data)
    delete user.password
    return user
}