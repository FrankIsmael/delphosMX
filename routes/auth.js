const router = require('express').Router()
const passport = require('../handlers/passport')
const User = require('../models/User')
const { isLogged ,isTeacher} = require('../handlers/middlewares')

router.get('/test',(req,res,next) => res.render('test'))
router.get('/signup', (req, res, next) => res.render('auth/signup'))

router.post('/signup', (req, res, next) => {
  console.log({ ...req.body })
  User.register({ ...req.body }, req.body.password)
    .then(() => {
      
      res.redirect('/login')
    
    })
    .catch(err => next(err))
})

router.get('/login', (req, res, next) => res.render('auth/login'))

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.redirect('/login')
    req.logIn(user, err => {
      if (err) return next(err)
      req.app.locals.loggedUser = user
      if (req.user.role === 'admin') return res.redirect(`/admin/${req.user._id}/profile`)
      else if (req.user.role === 'user') return res.redirect(`/user/${req.user._id}/profile`)
      else if (req.user.role === 'teacher')  return res.redirect(`/teacher/${req.user._id}/profile`)
    })
  })(req, res, next)
})

router.get('/logout', (req, res, next) => {
  req.app.locals.loggedUser = ''
  req.logOut()
  res.redirect('/')
})

router.get(`/user/:id/profile`, isLogged, (req, res, next) => {
  const { id } = req.params
  User.find({_id: id})
  .populate('courses')
  .then(user => {
    console.log(user)
    res.render('auth/profile', user[0])
  })
  .catch(err => next(err))
  
})
  

module.exports = router




