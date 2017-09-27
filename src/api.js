/**
 * Created by RedMoon on 2017/2/12.
 */

const path = require('path');
const fs = require('fs');
const express = require('express');
let router = express.Router();

let routes = path.join(__dirname, './routes');



let apiArray = fs.readdirSync(routes);
apiArray.forEach(api => require(path.join(routes, api))(router, middleware));

router.get('/touch', (req, res) => {
    res.json({
        touch: true
    })
})

module.exports = router;

function middleware() {

}