module.exports = (Schema) => {
    let schema = Schema({
        userId: Schema.Types.ObjectId,
        scope: String,
        scopeId: Schema.Types.ObjectId,
        auths: []
    })

    return schema
}