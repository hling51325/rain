module.exports = (router, middleware) => {
    router.get('/users', getUsers);
    router.post('/users', addUser);
    router.patch('/users/:id', updateUser)
};

const User = require('../lib/user')

function getUsers(req, res) {
    User.get()
        .then(data => res.json(data))
}

function addUser(req, res) {
    let data = {
        uid: 1,
        username: 'hling51325',
        name: '其妙',
        birthday: new Date('1994-02-20')
    }
    User.add(data)
        .then(data => res.json(data))
}

function updateUser(req, res) {
    let id = req.params.id
    let data = {
        $set:{
            name: '时值千叶'
        }
    }
    User.updateById(id, data)
        .then(data => res.json(data))
}