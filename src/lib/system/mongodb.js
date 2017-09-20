/**
 * Created by RedMoon on 2017/2/7.
 */

const path = require('path');
const os = require('os');
const fs = require('fs');
const gridFSStream = require('gridfs-stream');
const config = require('../../../config/mongodb')
const mongodb = require('mongodb')
const MongoClient = mongodb.MongoClient;

module.exports = {
    getConnectUrl,
    connect,
    getDb,
    getConnection,
    ObjectID: mongodb.ObjectID,
};

let connectDb = null

function getDb() {
    return connectDb
}

function getConnection(name) {
    return connectDb.collection(name)
}

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
        MongoClient.connect(getConnectUrl(), (err, db) => {
            if (err) reject(err)
            connectDb = db.db("test");
            resolve()
        })
    })
}