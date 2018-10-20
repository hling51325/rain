
module.exports = (Schema) =>{
    let schema = Schema({
        username: String,
        nickname: String,
        password: String,
        email: String,
        phone: String,
        gender: Number, // 0: no, 1: male, 2: female, 3: transform, 4: bisexual 
        birthday: Date
    })
    
    return schema
}