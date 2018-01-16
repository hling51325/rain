/**
 * Created by RedMoon on 2017/2/7.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const stream = require("stream");
const config = require('../../../config/mongodb')
const mongodb = require('mongodb')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const ObjectId = mongoose.Types.ObjectId
Grid.mongo = mongoose.mongo;

let gfs = null
mongoose.Promise = global.Promise;  // Use native promises

module.exports = {
    getConnectUrl,
    connect,
    ObjectId,
    setFile,
    getFileStream,
    getFile
};

function getConnectUrl() {
    if (config.url) return config.url
    let url = 'mongodb://';
    if (config.user) url += config.user;
    if (config.password) url += ':' + config.password + '@';
    url += config.host + ':' + config.port;
    let replicaSet = config.replicaSet;
    if (replicaSet && Array.isArray(replicaSet)) replicaSet.forEach(item => url += `,${item.host}:${item.port}`);
    url += '/' + config.name;
    if (replicaSet.length) url += `?replicaSet=${config.setName}`;
    return url;
}

function connect() {
    return new Promise((resolve, reject) => {
        mongoose.connect(getConnectUrl(), {
            useMongoClient: true
        });
        let db = mongoose.connection;
        db.on('error', (e) => {
            reject(e)
        });
        db.once('open', () => {
            // we're connected!
            gfs = Grid(db.db);
            resolve()
        });
    })
}

function getCollection(name) {
    return new mongoose.Collection(name, mongoose.connection);
}

function setFile(buffer, filename, content_type) {
    return new Promise((resolve, reject) => {
        let writeStream = gfs.createWriteStream({
            filename,
            content_type
        });

        let readStream = new stream.PassThrough();
        readStream.end(buffer);

        readStream.pipe(writeStream)

        writeStream.on('close', file => {
            resolve(file)
        })
    })
}

function getFileMeta(id) {
    return new Promise((resolve, reject) => {
        getCollection('fs.files').findOne({_id: id}, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
}

function getFileStream(id, range) {
    let gfs = new Grid(mongoose.connection.db);
    let readOptions = {
        _id: id
    };
    if (range) readOptions.range = range;
    return gfs.createReadStream(readOptions);
}

async function getFile(id, res, range) {
    id = new ObjectId(id)
    let meta = await getFileMeta(id)
    if (!meta) {
        res.status(500).send('file error');
        return
    }
    const total = meta.length;
    return range ? downloadRange(total) : download(total);

    function downloadRange(total) {

        let parts = range.replace(/bytes=/, "").split("-");
        let partialStart = parts[0];
        let partialEnd = parts[1];
        let start = parseInt(partialStart, 10);
        let end = partialEnd ? parseInt(partialEnd, 10) : total - 1;

        res.status(206)
        res.set('Content-Length', (end - start) + 1)
        res.set('Content-Range', `bytes ${start}-${end}/${total}`)
        res.set('Accept-Ranges', 'bytes')
        res.set('Content-Type', 'application/octet-stream')

        let readStream = getFileStream(id, {
            startPos: start,
            endPos: end
        });
        readStream.pipe(res);
    }

    function download(total) {
        res.status(200)
        res.set("Access-Control-Expose-Headers", "Accept-Ranges, Content-Encoding, Content-Length, Content-Range")
        res.set("Content-Length", total)
        res.set("Content-Type", "application/octet-stream")
        let readStream = getFileStream(id)
        readStream.pipe(res);
    }
}