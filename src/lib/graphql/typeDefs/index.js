
const path = require('path')
const fs = require('fs')

const rootPath = path.join(__dirname, './');

let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')

let typeDefs = files.reduce((curr, typeDef) => {
    return curr += fs.readFileSync(path.join(rootPath, typeDef), 'utf8')
}, '')

module.exports = typeDefs