const router = require('express').Router()
const Courses = require('../models/Courses')
const { isLogged, isTeacher } = require('../handlers/middlewares')

router.get('/:id', isLogged, isTeacher, (req, res, next) => res.render('teacher/profile'))



router.get(`/:id/courses`, (req, res, next) => {
  const { id } = req.params
  Courses.find({ owner: id })
    .populate('owner')
    .then(courses => {
      console.log(id)
      console.log(courses)
      res.render('teacher/courses', { courses,id })
    })
    .catch(err => next(err))
})

router.post('/:id/courses/create', (req, res, next) => {
  console.log(req.user)
  Courses.create({ 
    owner: req.user._id,
    name: req.body.name,
    description:req.body.description,
    costo: req.body.costo,
    imageURL: req.body.imageURL,
    fecha:req.body.fecha,
    duration:req.body.duration,
    rating:req.body.duration
   })
    .then(() => res.redirect('teacher/courses'))
    .catch(err => next(err))
})


module.exports = router

/* router.post('/artists/:id', (req, res, next) => {
  console.log(req.user)
  Comment.create({
    owner: req.user._id,
    artist: req.params.id,
    body: req.body.comment
  })
    .then(() => res.redirect(`/artists/${req.params.id}`))
    .catch(err => next(err))
})

router.get('/artists/:id', (req, res, next) => {
  const { id } = req.params
  const findArtists = Artist.findById(id)
  const findComments = Comment.find({ artist: id })
    .sort({ createdAt: -1 })
    .populate('owner')
  Promise.all([findArtists, findComments])
    .then(response => {
      res.render('artists/detail', {
        artist: response[0],
        comments: response[1]
      })
    })
    .catch(err => next(err))
})

router.post('/artists/:id', (req, res, next) => {
  console.log(req.user)
  Comment.create({
    owner: req.user._id,
    artist: req.params.id,
    body: req.body.comment
  })
    .then(() => res.redirect(`/artists/${req.params.id}`))
    .catch(err => next(err))
})

router.get('/admin/comments', (req, res, next) => {
  Comment.find()
    .populate('owner')
    .populate('artist')
    .then(comments => {
      res.render('admin/comments', { comments })
    })
    .catch(err => next(err))
}) */