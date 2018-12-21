module.exports = (Schema) => {
    let ObjectId = Schema.Types.ObjectId

    let schema = Schema({
        userId: ObjectId,
        resource: String, // project@xxx 
        auths: []
    })

    return schema
}