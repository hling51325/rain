
const passport = require('koa-passport')
const { SERVER, GITHUB } = require('config')
const { passwordCrypto } = require('../service/util')
const { User, OAuth } = require('../schema')

passport.serializeUser(({ _id }, done) => {
    return done(null, { _id })
})

passport.deserializeUser((_id, done) => {
    return User.findOne({ _id }, '-password', done)
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy((username, password, done) => {
    return User.findOne({ username, password: passwordCrypto(password) }, '-password', done)
}))

const GithubStrategy = require('passport-github').Strategy
passport.use(new GithubStrategy({
    clientID: GITHUB.CLIENT_ID,
    clientSecret: GITHUB.CLIENT_SECRET,
    callbackURL: `${SERVER}`
    // callbackURL: `http://localhost:3000/api/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
    profile = profile._json
    let auth = await OAuth.findOne({ id: profile.id, name: 'github' })
    if (auth) {
        let user = await User.findOne({ _id: auth.userId })
        return done(null, user)
    } else {
        let userData = {
            nickname: profile.name,
            avatar: profile.avatar_url
        }
        let user = await User.create(userData)
        let authData = {
            name: "github",
            userId: user._id,
            id: profile.id,
            token: accessToken,
            profile
        }
        await OAuth.create(authData)
        return done(null, user)
    }
}))