'use strict';
const http   = require('http');
const kelp   = require('kelp');
const body   = require('kelp-body');
const send   = require('kelp-send');
const error  = require('kelp-error');
const route  = require('kelp-route');
const serve  = require('kelp-static');
const logger = require('kelp-logger');
const config = require('kelp-config');

const app = kelp(config);

app.use(body);
app.use(send);
app.use(error);
app.use(logger);
app.use(serve(config.public));

//
app.use(route('/:name?', function(req, res){
  res.send(req.params);
}));

// default handler
app.use(function(req, res){
  res.send(404);
});

const server = http.createServer(app);
server.listen(config.port, function(err){
  console.log('server is running at %s', server.address().port);
});
