/**
 * Created by Holo on 2017/2/7.
 */

const express = require('express');
const compression = require('compression');
const morgan = require('morgan');
const path = require('path');
const fs = require('fs');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const sessionStore = require('connect-mongo');
const history = require('connect-history-api-fallback');

const profile = require('../config/profile')
const graphqlHTTP = require('express-graphql')
const schema = require('./lib/graphql/schema')

const maxBody = 500 * 1024 * 1024; // 500M

let app = express();

app.set('trust proxy', true);
app.use(compression());
app.use(morgan('tiny'));
app.use(bodyParser.json({limit: maxBody}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.raw({limit: maxBody}));
app.use(bodyParser.text());
app.use(cookieParser());
app.use(session({
    secret: 'ILOVEHOLO',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 3600000 * 24 * 7
    },
    store: getSessionStore()
}));
app.use(helmet());
app.use(express.static(path.join(__dirname, '/../public/dist')));
app.use(cors({
    origin: true,
    credentials: true
}));

app.use('/api/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.use('/api', require('./api'))
// app.use('/*', (req, res) => {
//     res.sendFile(path.join(profile.public, 'index.html'))
// })

app.use(history())

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    console.error(`404: ${err}`);
    err.status = 404;
    next(err);
});

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        console.error(`500: ${err}`);
        res.status(err.status || 500);
        res.json(err);
    });
}

app.use(function (err, req, res, next) {
    console.error(`500: ${err}`);
    res.status(err.status || 500);
    res.json(err);
});

function getSessionStore() {
    const MongoStore = sessionStore(session);
    return new MongoStore({mongooseConnection: mongoose.connection});
}

module.exports = app;