const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

let schema = mongoose.Schema({
    title: String,
    folderId: ObjectId,

    content: String, // html ?
    attachments: [{
        key: String,
        value: ObjectId
    }], // 附件

    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date,
    createdBy: ObjectId,
    updatedBy: ObjectId

});

module.exports = mongoose.model('blog', schema);