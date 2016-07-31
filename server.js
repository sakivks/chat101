const path = require('path');
const fs = require('fs');
var util = require('util');
const app = require('koa')();
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));


// Database
const mongoose = require('mongoose');
mongoose.connect(config.mongo.url);
console.log('connecting to MongoDB...');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Connected to db'));


// WEBPACK DEV middleware
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const webpackDevMiddleware = require('koa-webpack-dev-middleware');
const webpackHotMiddleware = require('koa-webpack-hot-middleware');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
}));
app.use(webpackHotMiddleware(compiler));


// Logger, favicon and bodyparser middlewares
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser');
app.use(logger());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser());

app.use(function* (next) {
  console.log('in body ->' + this.body);
  console.log('in data ->' + this.data);
  yield next;
  console.log('out ->' + util.inspect(this.state, false, null));
});

// Session
const session = require('koa-session');
// const flash = require('koa-flash');
app.keys = ['i m the newest secret', 'your-session-secret', 'another-session-secret'];
app.use(session(app));
// app.use(flash());

// Authentication
require('./src/auth');
const passport = require('koa-passport');
app.use(passport.initialize());
app.use(passport.session());


// Routes
// const serve = require('koa-static');
// app.use(serve('.'));
const router = require('koa-router')();

router.get('/', function* (next) {
  this.type = 'html';
  this.body = fs.readFileSync('public/index.html', 'utf8');
});

router.get('/app', function* (next) {
  this.type = 'html';
  this.body = fs.readFileSync('public/userHome.html', 'utf8');
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/app',
    failureRedirect: '/',
  })
);

// app.get('/login', function(req, res, next) {
//   passport.authenticate('local', function(err, user, info) {
//     if (err) { return next(err); }
//     if (!user) { return res.redirect('/login'); }
//     req.logIn(user, function(err) {
//       if (err) { return next(err); }
//       return res.redirect('/users/' + user.username);
//     });
//   })(req, res, next);
// });

router.get('/logout', function* (next) {
  this.logout();
  this.redirect('/');
});

// app.use(route.get('/', (ctx) => {
//   ctx.type = 'html';
//   ctx.body = fs.readFileSync('public/index.html', 'utf8');
// }));

// app.use(route.post('/login',
//   passport.authenticate('local', {
//     successRedirect: '/app',
//     failureRedirect: '/',
//   })
// ));

// app.use(route.get('/app', (ctx) => {
//   ctx.type = 'html';
//   ctx.body = fs.createReadStream('public/userHome.html');
// }));

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(process.argv[2] || 4000);
console.log(`Server listening on ${process.argv[2] || 4000}`);
