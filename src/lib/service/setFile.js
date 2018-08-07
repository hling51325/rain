const mongo = require('../system/mongodb')

module.exports = (req, res, next) => {
    let file = req.file
    if (!file) return next()
    mongo.setFile(file.buffer, file.originalname, file.mimetype)
        .then(file => {
            req.body.file = file
            return next()
        })
}