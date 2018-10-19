

const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

module.exports = {
    addDefaultField,
    middleware
}

function addDefaultField(schema, option) {
    schema.add({
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: Date,
        createdBy: ObjectId,
        updatedBy: ObjectId
    })
}

function middleware(schema) {
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });
}