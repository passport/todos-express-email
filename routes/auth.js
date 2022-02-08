var express = require('express');
var passport = require('passport');
var MagicLinkStrategy = require('passport-magic-link').Strategy;
var sendgrid = require('@sendgrid/mail');
var db = require('../db');


sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

passport.use(new MagicLinkStrategy({
    secret: 'my-secret',
    userFields: ['email'],
    tokenField: 'token',
    verifyUserAfterToken: true
 }, function(user, token) {
   console.log('SEND TOKEN');
   console.log(user);
   console.log(token);
   
   var msg = {
     to: user.email, // Change to your recipient
     from: process.env['SENDGRID_FROM'], // Change to your verified sender
     subject: 'Sending with SendGrid is Fun',
     text: 'and easy to do anywhere, even with Node.js',
     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
   }
   
   return sendgrid.send(msg);
 }, (user) => {
   console.log('FIND USER');
   
   //return User.findOrCreate({email: user.email, name: user.name})
 }))

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


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
