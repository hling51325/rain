
module.exports = (Schema) => {
    let ObjectId = Schema.Types.ObjectId

    let schema = Schema({
        userId: ObjectId,
        projectId: ObjectId,
        roleId: ObjectId
    })

    return schema
}