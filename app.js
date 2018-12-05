const express = require('express')
const mongoose = require('mongoose')
const authRoutes = require('./routes/auth-routes')
const passportSetup = require('./config/passport-setup')
const keys = require('./config/keys')

const app = express()

app.set('view engine', 'ejs')

mongoose.connect(keys.mongodb.dbURI, () => {
  console.log('connected to mongodb')
})

app.use('/auth', authRoutes)

app.get('/', (req, res) => {
  res.render('home')
})

app.listen(3000, () => {
  console.log('now listening on port 3000')
})
