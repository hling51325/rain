module.exports = (Schema) => {
    let schema = Schema({
        userId: Schema.Types.ObjectId,
        resource: String, // project@xxx 
        auths: []
    })

    return schema
}