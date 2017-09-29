module.exports = {
    signIn,
    signOut,

    getOne,
    get,
    add,
    updateById
}

let User = require('./schema/user')

function getOne(where) {
    return User.findOne(where)
}

function get() {
    return User.find({})
}

function add(data) {
    return User.find({}, 'uid').sort({uid: -1}).limit(1)
        .then(({uid}) => {
            data.uid = uid + 1
            let user = new User(data)
            return user.save()
        })
}

function updateById(id, data) {
    return User.findOneAndUpdate({_id: id}, data)
}

function signIn(data) {
    return User.findOne({username: data.username})
}

function signOut() {

}