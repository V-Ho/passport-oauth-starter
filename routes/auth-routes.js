// module.exports = router
const router = require('express').Router()
const passport = require('passport')

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user })
})

// auth logout
router.get('/logout', (req, res) => {
  // handle with passport
  res.send('logging out')
})

// auth redirects to google+ user consent screen
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}))

// callback route for google to redirect to, contains authentication code
// router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
//   res.send('you reached the redirect URI')
// })
router.get('/google/redirect', passport.authenticate('google'),
  (err, req, res, next) => {
    if (err.name === 'TokenError') {
      // res.redirect('/login')
      console.log('token error')
    } else {
      console.log('some error')
    }
  },
  (req, res) => {
    res.send('you reached the redirect URI')
  }
)
module.exports = router
