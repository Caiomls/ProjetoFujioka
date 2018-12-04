var express = require('express');
var router = express.Router();
var passport = require('passport');
const db = require('../db');

function authenticationMiddleware () {
  return function (req, res, next) {
    if (req.isAuthenticated()) {
      return next()
    }
    res.redirect('/login?fail=true')
  }
}

function authenticateAdminMiddleware () {
  return function (req, res, next) {
    try {
      if (req.user.isAdmin === true){
        return next()
    } else {
      res.redirect('/chat')
    }
    } catch (e) {
        res.redirect('/login')
    }
  }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { message: null });
})

router.get('/chat', authenticationMiddleware (), function(req, res){
   res.render('chat', { username: req.user.username });
})

router.get('/admin', authenticateAdminMiddleware (), function(req, res){
  db.findAllUsers(function(docs){
  res.render('admin', {"users": docs});
  })
})

router.get('/adminDelete', authenticateAdminMiddleware (), function(req, res){
  res.render('adminDelete');
})

router.get('/login', function(req, res){
  if(req.query.fail)
    res.render('login', { message: 'Usuário e/ou senha incorretos!' });
  else
    res.render('login', { message: null });
})

router.post('/login',
  passport.authenticate('local', { successRedirect: '/chat', failureRedirect: '/login?fail=true' })
);

router.get('/logoff', function(req, res, next) {
  req.logOut();
  res.redirect('/login')
})

module.exports = router;
