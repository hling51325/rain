
module.exports = (Schema) => {
    let schema = Schema({
        userId: Schema.Types.ObjectId,
        sessionId: String, // current sessionId
        name: String, // which site's token
        state: String,
        token: String,
        callback: String,
    })

    return schema
}