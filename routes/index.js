const router = require('express').Router()
const Courses = require('../models/Courses')
const { isLogged } = require('../handlers/middlewares')

router.get('/', (req, res, next) => {
  res.render('index')
})

router.get('/courses', (req, res, next) => {
Courses.find()
    .sort({ rating: -1 })
    .then(courses => {
      res.render('courses/all', { courses })
    })
    .catch(err => next(err))
})

router.get('/courses/:id', (req, res, next) => {
  const { id } = req.params
  const findCourses = Courses.findById(id)
  
  Promise.all(findCourses)
    .then(response => {
      res.render('courses/detail', {
        courses: response[0],
        comments: response[1]
      })
    })
    .catch(err => next(err))
})



module.exports = router