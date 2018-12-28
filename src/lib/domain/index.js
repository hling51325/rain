
const path = require('path')
const fs = require('fs')

const rootPath = path.join(__dirname, './');
let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')
let domains = files.reduce((curr, next) => {
    next = next.replace('.js', '')
    let key = next.replace(/^\w/, c => c.toUpperCase())
    curr[key] = require(`./${next}`)
    return curr
}, {})

module.exports = domains