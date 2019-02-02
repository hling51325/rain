let { run } = require('../src/app')
let { PORT } = require('config')
run(process.argv[2] || PORT)