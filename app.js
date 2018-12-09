const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes')
const profileRoutes = require('./routes/profile-routes')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')
const cookieSession = require('cookie-session') // encrypts cookie session
const passport = require('passport')

const app = express()

app.set('view engine', 'ejs')

app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
}))

// initialize passport and give access to req obj
app.use(passport.initialize())

// allow passport to alter req obj and change user value in sessionId into deserialized user obj
app.use(passport.session())

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb')
})

// set up routes
app.use('/auth', authRoutes)
app.use('/profile', profileRoutes)

// home route
app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('now listening on port 3000')
})
