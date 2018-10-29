
const passport = require('koa-passport')
const { SERVER, GITHUB } = require('config')
const { passwordCrypto } = require('../service/util')
const { User, Auth } = require('../schema')

passport.serializeUser((user, done) => {
    done(null, String(user._id))
})

passport.deserializeUser((_id, done) => {
    User.findOne({ _id }, done)
})

const LocalStrategy = require('passport-local').Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    let user = await User.findOne({ username, password: passwordCrypto(password) })
    done(null, user)
}))

const GithubStrategy = require('passport-github').Strategy
passport.use(new GithubStrategy({
    clientID: GITHUB.CLIENT_ID,
    clientSecret: GITHUB.CLIENT_SECRET,
    // callbackURL: `${SERVER}/api/auth/github/callback`
    // callbackURL: `http://localhost:3000/api/auth/github/callback`
}, async (accessToken, refreshToken, profile, done) => {
    profile = profile._json
    let auth = await Auth.findOne({ id: profile.id })
    if (auth) {
        let user = await User.findOne({ _id: auth.userId })
        let data = {
            userId: user._id,
            username: profile.login,
            nickname: profile.name,
        }
        done(null, data)
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
        let auth = await Auth.create(authData)
        let data = {
            userId: user._id,
            username: profile.login,
            nickname: profile.name,
        }
        done(null, data)
    }
}))