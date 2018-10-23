

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
    schema.pre('findOneAndUpdate', setDefaultOptions);
    schema.pre('updateMany', setDefaultOptions);
    schema.pre('updateOne', setDefaultOptions);
    schema.pre('update', setDefaultOptions);
    schema.pre('save', function (next) {
        this.updatedAt = new Date();
        next();
    });

    function setDefaultOptions() {
        this.setOptions({ new: true });
      }
}