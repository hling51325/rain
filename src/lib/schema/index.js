
const path = require('path')
const fs = require('fs')
const { mongoose } = require('../service/db')
const Schema = mongoose.Schema

const rootPath = path.join(__dirname, './');
let files = fs.readdirSync(rootPath).filter(file => file !== 'index.js')
let schemas = files.reduce((curr, next) => {
    next = next.replace('.js', '')
    let key = next.replace(/^\w/, c => c.toUpperCase())
    curr[key] = mongoose.model(next, require(`./${next}`)(Schema));
    return curr
}, {})

module.exports = schemas