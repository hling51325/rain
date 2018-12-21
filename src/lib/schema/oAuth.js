
module.exports = (Schema) => {
    let schema = Schema({
        userId: Schema.Types.ObjectId,
        id: String,
        sessionId: String, // current sessionId
        name: String, // github | 
        state: String,
        token: String,
        profile: Schema.Types.Mixed
    })

    return schema
}