const path = require('path');
const fs = require('fs');
const Koa = require('koa');
const convert = require('koa-convert');
// const co = require('co');
// var util = require('util');
const app = new Koa();
const config = JSON.parse(fs.readFileSync('./config/config.json', 'utf-8'));


// Database
const mongoose = require('mongoose');
mongoose.Promise = Promise;
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
app.use(convert(webpackDevMiddleware(compiler, {
  noInfo: true, publicPath: webpackConfig.output.publicPath,
})));
app.use(convert(webpackHotMiddleware(compiler)));

// Logger, favicon and bodyparser middlewares
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const bodyParser = require('koa-bodyparser');
app.use(logger());
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(bodyParser());


// Routes
// const serve = require('koa-static');
// app.use(serve('.'));


// Authentication
// require('./src/auth');
const router = require('./src/routes');

app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(process.env.PORT || process.argv[2] || 4000);
console.log(`Server listening on ${process.env.PORT || process.argv[2] || 4000}`);
