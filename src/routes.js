const router = require('koa-router')();
const fs = require('fs');
const auth = require('./auth');

router.get('/', function*() {
  this.type = 'html';
  this.body = fs.readFileSync('public/index.html', 'utf8');
});

router.get('/app', function*() {
  this.type = 'html';
  this.body = fs.readFileSync('public/userHome.html', 'utf8');
});

router.post('/login', function*() {
  console.log(this.request.body);
  yield auth.verify(this.request.body)
  .then(() => {
    this.body = { success: true };
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

module.exports = router;
