
module.exports = (Schema) => {
    let schema = Schema({
        foo: {
            type: String,
            default: 'foo'
        },
        bar: {
            type: String,
            default: 'bar'
        }
    })

    return schema
}