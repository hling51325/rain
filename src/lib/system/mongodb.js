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
gridFSStream.mongo = mongoose.mongo;
let gfs
let db
mongoose.Promise = global.Promise;  // Use native promises

module.exports = {
    getConnectUrl,
    connect,
    getDB,
    getFile,
    getFileInfo,
    ObjectId: new mongoose.Types.ObjectId
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
        let conn = mongoose.connect(getConnectUrl(), {
            useMongoClient: true
        });
        conn.on('error', (e) => {
            reject(e)
        });
        conn.once('open', () => {
            // we're connected!
            db = conn.db
            gfs = gridFSStream(conn.db);
            resolve()
        });
    })
}

function getDB(){
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