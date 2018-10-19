const gridFSStream = require('gridfs-stream')
const mongoose = require('mongoose');
const { DB_URL } = require('config')
gridFSStream.mongo = mongoose.mongo;
mongoose.Promise = global.Promise;  // Use native promises
let { addDefaultField, middleware } = require('./plugins')
mongoose.plugin(addDefaultField)
mongoose.plugin(middleware)

let gfs
let db

module.exports = {
    connect,
    getDB,
    getFile,
    getFileInfo,
    ObjectId: mongoose.Types.ObjectId
};

async function connect() {
    try {
        let ret = await mongoose.connect(DB_URL, {
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