var express = require('express');
var passport = require('passport');
var db = require('../db');

var router = express.Router();

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/email',
function(req, res, next) {
  console.log('ABOUT TO AUTH');
  console.log(req.body)
  
  next();
},
  passport.authenticate('magiclink', { action : 'requestToken', failWithError: true }),
  function(req, res) {
    console.log('REDIRECT TO VERIFY...');
    
    res.redirect('/check-your-inbox')
  }, function(err, req, res, next) {
    console.log('ERROR');
    console.log(err);
  });
  
router.get('/login/email/verify',
  passport.authenticate('magiclink', { action : 'acceptToken', failWithError: true }),
  function(req, res) {
    console.log('REDIRECT TO VERIFY...');

    //res.redirect('/check-your-inbox')
  }, function(err, req, res, next) {
    console.log('ERROR');
    console.log(err);
  });

router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
