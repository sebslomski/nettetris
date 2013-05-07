var express = require('express');

var app = express();

app.configure(function() {
  app.use(express.bodyParser());
  app.use('/static', express.static(__dirname + '/dist/static'));
  app.use(function(req, res) {
      res.sendfile(__dirname + '/dist/index.html');
  });
  app.use(app.router);
});

port = process.env.PORT || 9000;

app.listen(port, function() {
  return console.log('Listening on ' + port);
});
