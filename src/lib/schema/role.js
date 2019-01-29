
module.exports = (Schema) => {
    let schema = Schema({
        projectId: Schema.Types.ObjectId,
        name: String,
        isDefault: Boolean
    })

    return schema
}