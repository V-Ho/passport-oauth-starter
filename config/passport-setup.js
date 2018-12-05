const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

passport.use(
  new GoogleStrategy({
    // options for Google Strategy
    callbackURL: 'http://localhost:3000/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport cb function
    console.log('passport cb function fired')
    console.log(profile)
    // save user's google profile id
    new User({
      username: profile.displayName,
      googleId: profile.id
    }).save().then((newUser) => {
      console.log(`New User: ${newUser}`)
    })
    // done()
  })
)
