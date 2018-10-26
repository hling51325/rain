let defaultRoles = [
    {
        name: 'normal',
        auths: ['project-exit'],
        isDefault: true
    },
    {
        name: 'admin',
        auths: ['member-add', 'member-remove', 'project-exit']
    }
]

module.exports = {
    defaultRoles
}