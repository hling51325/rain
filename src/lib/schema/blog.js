
module.exports = (Schema) => {
    let schema = Schema({
        title: String,
        author: String,
        content: String // html ?
    })

    return schema
}