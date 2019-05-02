exports.isLogged = (req, res, next) => {
    if (!req.isAuthenticated()) return res.redirect('/login')
    next()
  }
  
  exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'ADMIN') {
      req.logOut()
      res.redirect('/login')
    } else {
      next()
    }
  }

  exports.isTeacher = (req,res,next) => {
    if (req.user.role !== 'TEACHER') {
      req.logOut()
      res.redirect('/login')
    } else {
      next()
    }
  }