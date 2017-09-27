module.exports = (router, middleware) => {
    router.post('/sign-in', signIn);
    router.get('/sign-out', signOut);

    router.get('/users', getUsers);
    router.post('/users', addUser);
    router.patch('/users/:id', updateUser)
};

const User = require('../lib/user')

function signIn(req, res) {
    let data = req.body
    User.signIn(data)
        .then(data => res.json(data))
}

function signOut(req, res) {

}

function getUsers(req, res) {
    User.get()
        .then(data => res.json(data))
}

function addUser(req, res) {
    let data = req.body
    User.add(data)
        .then(data => res.json(data))
}

function updateUser(req, res) {
    let id = req.params.id
    let data = req.body
    User.updateById(id, data)
        .then(data => res.json(data))
}