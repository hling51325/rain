
module.exports = (Schema) => {
    let schema = Schema({
        state: String,
        accessToken: String,
        username: String,
        nickname: String,
        password: String,
        email: String,
        phone: String,
        gender: Number, // 0: no, 1: male, 2: female, 3: transform, 4: bisexual 
        birthday: Date,

        oauths: [{
            _id: false,
            id: String,
            accessToken: String,
            
        }]
    })

    return schema
}