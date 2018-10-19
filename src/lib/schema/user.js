
module.exports = (Schema) =>{
    let schema = Schema({
        username: String,
        nickname: String,
        password: String
    })
    
    return schema
}