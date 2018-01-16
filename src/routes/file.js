const upload = require('../lib/service/multer')
const setFile = require('../lib/service/setFile')
const mongo = require('../lib/system/mongodb')

module.exports = (router, middleware) => {
    router.post('/file', upload.single('file'), setFile, addFile)
    router.get('/file/:id', getFile)
};

function addFile(req, res) {
    res.json(req.body)
}

function getFile(req, res) {
    let id = req.params.id
    mongo.getFile(id, res)
}