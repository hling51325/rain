const { pick } = require('lodash')
const createMeta = ['createdAt', 'createdBy', 'updatedAt', 'updatedBy']
const updateMeta = ['updatedAt', 'updatedBy']
const fields = {
    user: {
        create: [],
        update: ['nickname', 'email', 'gender', 'birthday', 'avatar', 'phone', ...updateMeta]
    },
    role: {
        create: ['projectId', 'name', 'auths', 'isDefault', ...createMeta],
        update: ['isDefault', 'name', 'auths', ...updateMeta]
    }
}

module.exports = (data, model, action) => {
    return pick(data, fields[model][action])
}