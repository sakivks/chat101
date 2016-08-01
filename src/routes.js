const router = require('koa-router')();
const fs = require('fs');

router.get('/', function*(next) {
  this.type = 'html';
  this.body = fs.readFileSync('public/index.html', 'utf8');
});

router.get('/app', function*(next) {
  this.type = 'html';
  this.body = fs.readFileSync('public/userHome.html', 'utf8');
});

// router.post('/login', );

module.exports = router;
