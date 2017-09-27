/**
 * Created by Holo on 2017/2/6.
 */

const http = require('http');
const https = require('https');
const fs = require('fs');
let webSocket = require('./webSocket');
const mongo = require('./lib/system/mongodb')

console.info('start app');
console.info(`=> start MongoDB service, ${mongo.getConnectUrl()}`);
mongo.connect()
    .then(() => {
        console.info('MongoDB connected')

        let server = http.createServer(require('./express'));

        console.info('start web socket');
        webSocket.init(server);

        server.listen('3333', () => {
            console.info('server listening 3333');
        });
    })
    .catch(e => {
        console.log(e)
    })

