module.exports = (router, middleware) => {
    router.post('/sign-in', signIn);
    router.get('/sign-out', signOut);
    router.get('/signed', signed)

    router.get('/user', getUser);

    router.get('/users', getUsers);
    router.post('/users', addUser);
    router.patch('/users/:id', updateUser)
};

const User = require('../lib/user')
const makeFilter = require('../lib/service/makeFilter')

function signIn(req, res) {
    let data = req.body
    User.signIn(data)
        .then(data => {
            req.session.userId = data._id
            req.session.username = data.username
            res.json(data)
        })
}

function signOut(req, res) {
    delete req.session.userId
    delete req.session.username
    res.send(200)
}

function signed(req, res) {
    let userId = req.session.userId
    User.signed(userId)
        .then(user => {
            res.json(user)
        })
}

function getUser(req, res) {
    let filter = makeFilter(req)
    User.getOne(filter.where)
        .then(data => res.json(data))
}

function getUsers(req, res) {
    let filter = makeFilter(req)
    User.get(filter)
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