const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

let schema = mongoose.Schema({
    uid: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: ObjectId,
    nickname: String,
    birthday: Date,
    createdAt: Date
});

module.exports = mongoose.model('user', schema);