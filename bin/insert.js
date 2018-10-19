const db = require('../src/lib/service/db')
const { User } = require('../src/lib/schema')
const { passwordCrypto } = require('../src/lib/service/util')

async function run() {
    await db.connect()
    await User.insertMany([
        {
            username: 'tokine',
            password: passwordCrypto('tokine'),
            nickname: 'tokine'
        }
    ])
}

run()
