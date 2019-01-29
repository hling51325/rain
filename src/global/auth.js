module.exports = {
    project: {
        admin: [
            'READ_PROJECT',
            "DELETE_MEMBER",
            "ADD_MEMBER",
            "DELETE_PROJECT",
            "UPDATE_PROJECT"
        ],
        normal: [
            'READ_PROJECT'
        ]
    },
    user: {
        admin: [
            "UPDATE_USER",
            "DELETE_USER",
            "ADD_USER"
        ],
        normal: [
        ]
    }
}