const router = require('express').Router()

router.get('/test',(req,res,next) => {
  res.render('test')
})

module.exports = router