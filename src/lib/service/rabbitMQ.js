
const amqp = require('amqplib/callback_api');

module.exports = {
    connect
}

let URL = 'amqp://localhost'

async function connect() {
    conn = await getConnect(URL)
    ch = await getChannel(conn)
    return { conn, ch }

    function getConnect(URL) {
        return new Promise((resolve, reject) => {
            amqp.connect(URL, function (err, conn) {
                if (err) reject(err)
                resolve(conn)
            });
        })
    }

    function getChannel(conn) {
        return new Promise((resolve, reject) => {
            conn.createChannel(function (err, ch) {
                if (err) reject(err)
                resolve(ch)
            });
        })
    }
}