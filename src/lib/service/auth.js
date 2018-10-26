
const passport = require('koa-passport')
const { SERVER, GITHUB } = require('config')
const { passwordCrypto } = require('../service/util')
const { User } = require('../schema')

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser((_id, done) => {
    User.findOne({ _id }, done)
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username, password: passwordCrypto(password) }, done)
}))

const GithubStrategy = require('passport-github').Strategy
passport.use(new GithubStrategy({
    clientID: GITHUB.CLIENT_ID,
    clientSecret: GITHUB.CLIENT_SECRET,
    callbackURL: `${SERVER}/api/oauth/github/callback`
}, (accessToken, refreshToken, profile, done) => {
    User.findOneAndUpdate({ 'oauths.id': profile.id }, {}, done) // ?
}))