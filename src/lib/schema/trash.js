
module.exports = (Schema) => {
    let schema = Schema({
        name: String, // 原集合名
        resource: Schema.Types.Mixed // 资源
    })

    return schema
}