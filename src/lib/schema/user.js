const mongoose = require('mongoose');

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
    nickname: String,

    birthday: Date,
});

module.exports = mongoose.model('user', schema);