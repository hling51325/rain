/**
 * Created by RedMoon on 2017/2/7.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const stream = require("stream");
const gridFSStream = require('gridfs-stream');
const config = require('../../../config/mongodb')
const mongodb = require('mongodb')
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;

let gfs = null
mongoose.Promise = global.Promise;  // Use native promises

module.exports = {
    getConnectUrl,
    connect,
    ObjectId: new mongoose.Types.ObjectId,
    setFile
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