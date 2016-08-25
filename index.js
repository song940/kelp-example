'use strict';
const http    = require('http');
const jade    = require('jade');

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
const session = require('kelp-session');

const app = kelp()

.use(body)
.use(send)
.use(error)
.use(logger)
.use(cookie)
.use(session())
.use(serve(config.public))
.use(render({
  templates: 'views',
  extension: 'jade' ,
  compiler : function(content, filename){
    return jade.compile(content, {
      filename: filename
    });
  }
}));

app.use(function(req, res, next){
  res.render('home', { name: config.name });
});

// default handler
app.use(function(req, res){
  res.send(404);
});

const server = http.createServer(app);
server.listen(config.port, function(err){
  console.log('server is running at %s', server.address().port);
});
