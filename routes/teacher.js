const router = require('express').Router()
const Courses = require('../models/Courses')
const { isAdmin, isLogged,isTeacher} = require('../handlers/middlewares')

router.get('/:id/profile',(req, res, next) => {
  const { id } = req.params
  Courses.find({ owner: id })
    .populate('owner')
    .then(courses => {
      res.render('teacher/profile', { courses,id })
    })
    .catch(err => next(err))
})


/* router.get(`/:id/courses`, (req, res, next) => {
  const { id } = req.params
  Courses.find({ owner: id })
    .populate('owner')
    .then(courses => {
      res.render('teacher/courses', { courses,id })
    })
    .catch(err => next(err))
}) */

router.post('/:id/courses/create', (req, res, next) => {
  console.log('AQUI')
  const {id} = req.params
  console.log(id)
   Courses.create({ 
    owner: req.user._id,
    name: req.body.name,
    description:req.body.description,
    costo: req.body.costo,
    imageURL: req.body.imageURL,
    fecha:req.body.fecha,
    duration:req.body.duration,
    rating:req.body.rating
   })
    .then(() => res.redirect(`/${id}`))
    .catch(err => next(err))
})

router.get(`/:id/courses/:idc`, (req, res, next) => {
  const { id,idc } = req.params
  Courses.find({ owner: id , _id:idc})
    .populate('owner')
    .then(course => {
      console.log(course)
      res.render('teacher/detail', course[0])
    })
    .catch(err => next(err))
})

module.exports = router

/* router.get('/places/new',(req,res,next) => {
  const config = {
    action: '/places/new',
    place:{},
    button: 'Create'
  }
  res.render('new',config)
})

router.post('/places/new', (req,res,next) => {
  Place.create({...req.body})
  .then(place => {
    res.redirect(`/places/${place._id}`)
  })
  .catch(err => {
    res.send(err)
  })
}) */