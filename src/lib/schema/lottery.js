
module.exports = (Schema) => {
    let schema = Schema({
        red: [],
        blue: Number,
        expect: String,
        time: String
    })

    return schema
}