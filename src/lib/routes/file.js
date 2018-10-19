module.exports = (router, middleware) => {
    router.get('/files/:id', getFile)
    // router.post('/files', upload.single('file'), uploadFile);

    router.get('/files/:id/:name', getFileByName)
};

// const mongo = require('../lib/system/mongodb')
// const multer = require('multer');
// const storage = require('multer-gridfs-storage')({
//     db: mongo.getDB(),
//     file(req, file) {
//         return {
//             filename: file.originalname
//         }
//     }
// });
// const upload = multer({ storage: storage });

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