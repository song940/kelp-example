'use strict';
const http    = require('http');
const kelp    = require('kelp');
const auth    = require('kelp-auth');
const body    = require('kelp-body');
const send    = require('kelp-send');
const error   = require('kelp-error');
const route   = require('kelp-route');
const serve   = require('kelp-static');
const logger  = require('kelp-logger');
const config  = require('kelp-config');
const render  = require('kelp-render');
const cookie  = require('kelp-cookie');
const captcha = require('kelp-captcha');

const app = kelp()

.use(body)
.use(send)
.use(error)
.use(logger)
.use(cookie)
.use(serve(config.public))

app.use(route('/captcha.jpg', captcha({
  width     : 250   ,
  height    : 100   ,
  length    : 6     ,
  color     : '#fff',
  fontSize  : 60    ,
  background: 'rgb(20,30,200)'
})));

// default handler
app.use(function(req, res){
  res.send(404);
});

const server = http.createServer(app);
server.listen(config.port, function(err){
  console.log('server is running at %s', server.address().port);
});
