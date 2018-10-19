
const multer = require('koa-multer');
const { FILE_SIZE_LIMIT, DB_URL } = require('config')

const storage = require('multer-gridfs-storage')({
    url: DB_URL
});

module.exports = multer({
    storage,
    limits: {
        fileSize: FILE_SIZE_LIMIT // 5M
    }
});