const mongoose = require('mongoose');

let schema = mongoose.Schema({
    name: String,
    password: String,
    birthday: Date,
    nickname: String
});

module.exports = mongoose.model('user', schema);