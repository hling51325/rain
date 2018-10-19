
module.exports = (Schema) => {
    let schema = Schema({
        projectId: Schema.Types.ObjectId,
        name: String,
        auths: [],
        isDefault: Boolean
    })

    return schema
}