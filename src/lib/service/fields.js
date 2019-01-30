const { pick } = require('lodash')
const fields = {
    user: {
        create: [],
        update: ['nickname', 'email', 'gender', 'birthday', 'avatar', 'phone']
    }
}

module.exports = (data, model ,action) => {
    return pick(data, fields[model][action])
}