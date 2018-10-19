const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

let schema = mongoose.Schema({

    
    code: String,
    createdAt: Date
});

let oauth = mongoose.model('oauth', schema);