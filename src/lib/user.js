module.exports = {
    signIn,
    signOut,
    signed,

    getOne,
    get,
    add,
    updateById
}

let User = require('./schema/user')
const crypto = require('crypto');


function getOne(where, projection) {
    return User.findOne(where, projection)
}

function get() {
    return User.find({})
}

function add(data) {
    if (!data.password || !data.username) return
    data.password = passwordCrypto(data.password)
    return User.find({}, 'uid').sort({uid: -1}).limit(1)
        .then(result => {
            let uid = result.uid || 0
            data.uid = uid + 1
            let user = new User(data)
            return user.save()
                .then(user => {
                    delete user.password
                    return user
                })
        })
}

function updateById(id, data) {
    return User.findOneAndUpdate({_id: id}, data, {new: true})
}

function signIn(data) {
    data.password = passwordCrypto(data.password)
    return User.findOne({
        username: data.username,
        password: data.password
    })
}

function signOut() {

}

function signed(userId) {
    return User.findById(userId)
}

function passwordCrypto(password) {
    return crypto.createHmac('sha256', password)
        .update('I love holo')
        .digest('hex');
}