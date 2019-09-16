const gridFSStream = require('gridfs-stream')
const mongoose = require('mongoose');
const { DB_URL } = require('config')
const ObjectId = mongoose.Schema.Types.ObjectId
gridFSStream.mongo = mongoose.mongo;
mongoose.Promise = global.Promise;  // Use native promises
mongoose.plugin(addDefaultField)
mongoose.plugin(middleware)

let gfs
let db

module.exports = {
    connect,
    getDB,
    getFile,
    getFileInfo,
    ObjectId: mongoose.Types.ObjectId,
    mongoose
};

async function connect() {
    try {
        let ret = await mongoose.connect(DB_URL, {
            poolSize: 10,
            useNewUrlParser: true
        })
        db = ret.connection.db
        gfs = gridFSStream(db);
    } catch (e) {
        console.log(e)
    }
}

function getDB() {
    return db
}

function getFile(_id, res) {
    let readstream = gfs.createReadStream({
        _id
    });
    readstream.pipe(res);
}

function getFileInfo(_id) {
    return new Promise((resolve, reject) => {
        gfs.findOne({
            _id
        }, (err, file) => {
            if (!err) resolve(file)
            reject(err)
        })
    })
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