
module.exports = (Schema) => {
    let schema = Schema({
        collection: String, // 原集合名
        resource: Schema.Types.Mixed // 资源
    })

    return schema
}