const upload = require('../lib/service/multer')
const setFile = require('../lib/service/setFile')

module.exports = (router, middleware) => {
    router.post('/file', upload.single('file'), setFile, addFile)
};

function addFile(req, res) {
    res.json(req.body)
}