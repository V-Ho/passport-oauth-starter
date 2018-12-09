const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require('./keys')
const User = require('../models/user-model')

// stores user info into a cookie
passport.serializeUser((user, done) => {
  done(null, user.id)
})

// cookie gets passed back to browser
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

passport.use(
  new GoogleStrategy({
    // options for Google Strategy
    callbackURL: 'http://localhost:3000/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
  }, (accessToken, refreshToken, profile, done) => {
    // passport cb function
    console.log('passport cb function fired')

    // check if user already exists
    User.findOne({googleId: profile.id}).then((currentUser) => {
      if (currentUser) {
        console.log(`current user is: ${currentUser}`)
        done(null, currentUser)
      } else {
        // save user's google profile id
        new User({
          username: profile.displayName,
          googleId: profile.id
        }).save().then((newUser) => {
          console.log(`New User: ${newUser}`)
          done(null, newUser)
        })
      }
    })
    // done()
  })
)
