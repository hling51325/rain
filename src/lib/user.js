module.exports = {
    get,
    add,
    updateById,
}

let User = require('./system/mongodb').getConnection('user')
let ObjectID = require('./system/mongodb').ObjectID

function get() {
    return User.find({}).toArray()
}

function add(data) {
    return User.insertOne(data)
}

function updateById(id, data) {
    id = new ObjectID(id)
    return User.findOneAndUpdate({_id: id}, data)
}