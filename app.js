var express = require('express');
var path = require("path");
var app = express();

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, './index.html'));
});

app.listen(3000, function() {
  console.log('Listening on port: ' + 3000);
});
