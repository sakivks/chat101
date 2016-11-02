const router = require('koa-router')();
const fs = require('fs');
const auth = require('./auth');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const rp = require('request-promise');
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));

router.get('/', async function(ctx, next) {
  // try {
  //   if ((this.cookies.get('auth') !== undefined) &&
  //     jwt.verify(this.cookies.get('auth'), 'LoveUJenkins').username) {
  //     this.redirect('/app');
  //   }
  // } catch (err) {
  //   console.error(err.message);
  // }
  ctx.type = 'html';
  ctx.body = fs.readFileSync('public/index.html', 'utf8');
});

router.get('/fb', async function(ctx, next) {
  ctx.type = 'html';
  ctx.body = fs.readFileSync('public/fbLogin.html', 'utf8');
});

router.get('/fbR', async function(ctx, next) {
  ctx.type = 'text';
  const accessTokenUrl = `https://graph.facebook.com/v2.8/oauth/access_token?client_id=${config.oAuth.fbAppId}&redirect_uri=${config.oAuth.loginRedirect}&client_secret=${config.oAuth.appSecret}&code=${ctx.request.query.code}`;
  const accessToken = JSON.parse(await rp(accessTokenUrl));
  console.log(accessToken);
  ctx.body = JSON.stringify(accessToken, null, 4);
});

// router.get('/app', function*() {
//   try {
//     if (!(this.cookies.get('auth') !== undefined) ||
//       !jwt.verify(this.cookies.get('auth'), 'LoveUJenkins').username) {
//       this.redirect('/');
//     }
//   } catch (err) {
//     console.error(err.message);
//     this.redirect('/');
//   }

//   this.type = 'html';
//   this.body = fs.readFileSync('public/userHome.html', 'utf8');
// });

// router.post('/login', function*() {
//   yield auth.verify(this.request.body)
//     .then((user) => {
//       const token = jwt.sign({ username: this.request.body.username },
//         'LoveUJenkins',
//         { expiresIn: '1m' });
//       this.body = { success: true, auth: token, user };
//     })
//     .then(null, (err) => {
//       this.body = {
//         success: false,
//         info: err.info,
//       };
//     })
//     .catch((err) => {
//       this.body = {
//         success: false,
//         info: err.info,
//       };
//       console.log(err);
//     });
// });

// router.post('/register', function*() {
//   const user = new User(this.request.body);
//   yield user.save()
//     .then(() => {
//       this.body = {
//         success: true,
//       };
//     })
//     .catch((err) => {
//       this.body = {
//         success: false,
//         info: err.info,
//       };
//       console.log(err);
//     });
// });

router.get(/(|^$)/, async function(ctx, next) { // final route if nothing matches
  ctx.redirect('/');
});

module.exports = router;
