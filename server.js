const path = require('path');
const app = require('koa')();
const logger = require('koa-logger');
const favicon = require('koa-favicon');
const serve = require('koa-static');

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
// WEBPACK DEV middleware

// Standard, bare-minimum middlewares
app.use(logger());
app.use(serve('.'));
app.use(favicon(path.join(__dirname, '/public/favicon.ico')));


app.listen(process.argv[2] || 4000);
console.log(`Server listening on ${process.argv[2] || 4000}`);
