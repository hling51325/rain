
module.exports = (router) => {
    router.get('/third-part-auth/:type', getThirdPart)
    router.get('/oauth/callback', oauthCallback)
    router.get('/authorize', getAuth)
    router.post('/token', getToken)
}
const crypto = require('crypto');
const clientId = '49c8adb08594328d54b1'
const clientSecret = '0fa12b38df27b33edeaea7f23fdfc2917d3497f1'
const redirectUri = 'https://tokine.online/api/oauth/callback'
const state = passwordCrypto((Math.random() * 100).toFixed(2))

function getThirdPart(req, res) {
    let type = req.params.type
    type = 'github'
    let url = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user&state=${state}`
    res.redirect(url)
}


function passwordCrypto(password) {
    return crypto.createHmac('sha256', password)
        .update('I love holo')
        .digest('hex');
}

async function oauthCallback(req, res) {
    const {
        code,
        state
    } = req.body

    let response = await axios.post('https://github.com/login/oauth/access_token',{
        client_id:clientId,
        client_secret:clientSecret,
        code,
        redirect_uri: 'https://tokine.online',
        state
    },{
        headers:{
            Accept: "application/json"
        }
    })
    // {"access_token":"e72e16c7e42f292c6912e7710c838347ae178b4a", "scope":"repo,gist", "token_type":"bearer"}
    // response
}

function getAuth(req, res) {
    const {
        response_type,
        client_id,
        redirect_uri,
        scope,
        state
    } = req.body


    axios.get(redirect_uri, {
        code: getCode,
        state
    })

    function getCode() {
        return (Math.random() * 100).toFixed(2)
    }
}

function getToken(req, res, next) {
    const {
        grant_type,
        code,
        redirect_uri,
        client_id
    } = req.body

    // 

    res.json({
        access_token,
        token_type: 'bearer',
        expires_in: '84900',
        // refresh_token,
        // scope
    })
}