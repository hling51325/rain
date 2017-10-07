const mongo = require('../src/lib/system/mongodb')

let func = process.argv[2]

if (!func) return

mongo.connect()
    .then(() => {
        console.info('MongoDB connected')

        return require(func)()
    })
    .catch(e=>{
        console.log(e)
    })
