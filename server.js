const path = require('path');
const app = require('koa')();
const logger = require('koa-logger');
const favicon = require('koa-favicon');
var serve = require('koa-static');

app.use(logger());

app.use(serve('.'));


app.use(favicon(path.join(__dirname, '/public/favicon.ico')));

app.listen(process.argv[2] || 4000);
console.log(`Server listening on ${process.argv[2] || 4000}`);
