const upload = require('../service/multer')

module.exports = [
    {
        verb: 'get',
        url: '/files/:id/',
        method: getFile
    },
    {
        verb: 'post',
        url: '/files/',
        before: [upload.single('file')],
        method: uploadFile
    },
    {
        verb: 'get',
        url: '/files/:id/:name/',
        method: getFileByName
    }
]

function uploadFile(req, res) {
    res.json(req.file)
}

async function getFile(req, res) {
    let id = req.params.id
    let fileInfo = await mongo.getFileInfo(id)
    res.setHeader('Content-Disposition', `attachment;filename*=UTF-8''${encodeURIComponent(fileInfo.filename)}`);
    return mongo.getFile(id, res)
}

async function getFileByName(req, res) {
    let { id, name } = req.params
    
}