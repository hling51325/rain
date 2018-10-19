
module.exports = {
    passwordCrypto
}

const crypto = require('crypto');

function passwordCrypto(password) {
    return crypto.createHmac('sha256', password)
        .update('I love holo')
        .digest('hex');
}