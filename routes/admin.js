const router = require('express').Router()
const Courses = require('../models/Courses')
const User = require('../models/User')

router.get('/admin', (req, res, next) => res.render('admin/profile'))

router.get('/admin/courses', (req, res, next) => {
  Courses.find()
    .sort({ createdAt: -1 })
    .then(courses => {
      res.render('admin/courses', { courses })
    })
    .catch(err => next(err))
})

router.post('/admin/courses/create', (req, res, next) => {
  Courses.create({ ...req.body })
    .then(() => res.redirect('/admin/courses'))
    .catch(err => next(err))
})

router.get('/admin/courses/delete/:id', (req, res, next) => {
  const { id } = req.params
  Courses.findByIdAndDelete(id)
    .then(() => res.redirect('/admin/courses'))
    .catch(err => next(err))
})

router.get('/admin/users', (req, res, next) => {
  User.find({role: {$ne: "ADMIN"}})
    .then(users => {
      res.render('admin/users', { users })
    })
    .catch(err => next(err))
})

router.post('/admin/users/create',(req,res,next) => {
  User.create({...req.body})
  .then(() => res.redirect('/admin/users'))
  .catch(err => next(err))
})

router.get('/admin/users/delete/:id',(req,res,next) => {
  const {id} = req.params
  User.findByIdAndDelete(id)
  .then(() => res.redirect('/admin/users'))
    .catch(err => next(err))
})

module.exports = router