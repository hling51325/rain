const User = require('../src/lib/schema/user')

module.exports = () => {
    return User.remove({})
        .then(users=>{
            console.log(users)
        })
}