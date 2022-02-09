var express = require('express');
var passport = require('passport');
var MagicLinkStrategy = require('passport-magic-link').Strategy;
var sendgrid = require('@sendgrid/mail');
var db = require('../db');


sendgrid.setApiKey(process.env['SENDGRID_API_KEY']);

passport.use(new MagicLinkStrategy({
  secret: 'keyboard cat',
  userFields: [ 'email' ],
  tokenField: 'token',
  verifyUserAfterToken: true
}, function(user, token) {
  var link = 'http://localhost:3000/login/email/verify?token=' + token;
  
  var msg = {
    to: user.email, // Change to your recipient
    from: process.env['SENDGRID_FROM'], // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js.  Click here: ' + link,
    _html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  return sendgrid.send(msg);
}, function(user) {
  return new Promise(function(resolve, reject) {
    db.get('SELECT rowid AS id, * FROM users WHERE email = ?', [
      user.email
    ], function(err, row) {
      if (err) { return reject(err); }
      if (!row) {
        db.run('INSERT INTO users (email, email_verified) VALUES (?, ?)', [
          user.email,
          1
        ], function(err) {
          if (err) { return reject(err); }
          var id = this.lastID;
          var obj = {
            id: id,
            email: user.email
          };
          return resolve(obj);
        });
      } else {
        return resolve(row);
      }
    });
  });
}));

passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, email: user.email });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
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
    
    res.redirect('/login/email/check')
  }, function(err, req, res, next) {
    console.log('ERROR');
    console.log(err);
  });

router.get('/login/email/check', function(req, res, next) {
  res.render('check');
});

router.get('/login/email/verify', passport.authenticate('magiclink', {
  action : 'acceptToken',
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));

router.post('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
