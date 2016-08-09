const router = require('koa-router')();
const fs = require('fs');
const auth = require('./auth');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

router.get('/', function*() {
  try {
    if ((this.cookies.get('auth') !== undefined) &&
      jwt.verify(this.cookies.get('auth'), 'LoveUJenkins').username) {
      this.redirect('/app');
    }
  } catch (err) {
    console.error(err.message);
  }
  this.type = 'html';
  this.body = fs.readFileSync('public/index.html', 'utf8');
});

router.get('/app', function*() {
  try {
    if (!(this.cookies.get('auth') !== undefined) ||
      !jwt.verify(this.cookies.get('auth'), 'LoveUJenkins').username) {
      this.redirect('/');
    }
  } catch (err) {
    console.error(err.message);
    this.redirect('/');
  }

  this.type = 'html';
  this.body = fs.readFileSync('public/userHome.html', 'utf8');
});

router.post('/login', function*() {
  yield auth.verify(this.request.body)
    .then((user) => {
      const token = jwt.sign({ username: this.request.body.username },
        'LoveUJenkins',
        { expiresIn: '1m' });
      this.body = { success: true, auth: token, user };
    })
    .then(null, (err) => {
      this.body = {
        success: false,
        info: err.info,
      };
    })
    .catch((err) => {
      this.body = {
        success: false,
        info: err.info,
      };
      console.log(err);
    });
});

router.post('/register', function*() {
  const user = new User(this.request.body);
  yield user.save()
    .then(() => {
      this.body = {
        success: true,
      };
    })
    .catch((err) => {
      this.body = {
        success: false,
        info: err.info,
      };
      console.log(err);
    });
});

router.get(/(|^$)/, function*() { // final route if nothing matches
  this.redirect('/');
});

module.exports = router;
