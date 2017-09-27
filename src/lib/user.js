module.exports = {
    signIn,
    signOut,

    get,
    add,
    updateById
}

let User = require('./schema/user')

function get() {
    return User.find({})
}

function add(data) {
    let user = new User(data)
    return user.save()
}

function updateById(id, data) {
    return User.findOneAndUpdate({_id: id}, data)
}

function signIn(data) {
    return User.findOne({name: data.name})
}

function signOut() {

}