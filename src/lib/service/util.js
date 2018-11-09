
module.exports = {
    passwordCrypto,
    timeout
}

const crypto = require('crypto');

function passwordCrypto(password) {
    return crypto.createHmac('sha256', password)
        .update('I love holo')
        .digest('hex');
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}