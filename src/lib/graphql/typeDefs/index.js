
const path = require('path')
const fs = require('fs')

let typeDefs = ''
const rootPath = path.join(__dirname, './');

let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')

files.forEach(typeDef => {
    typeDefs += fs.readFileSync(path.join(rootPath, typeDef), 'utf8')
})

module.exports = typeDefs