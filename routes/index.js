const router = require('express').Router()
const Courses = require('../models/Courses')
const { isLogged } = require('../handlers/middlewares')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/courses/all', (req, res, next) => {
  Courses.find()
    .sort({ rating: -1 })
    .then(courses => {
      res.render('courses/all', { courses })
    })
    .catch(err => next(err))
})

router.get('/courses/:id', (req, res, next) => {
  const { id } = req.params
  Courses.findById(id)
    .then(course => {
      res.render('courses/detail', course)
    })
    .catch(err => next(err))
})



module.exports = router
