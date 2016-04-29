var express = require('express');
var path = require("path");
var app = express();


var env = (process.env.NODE_ENV).trim();
var js = '/js';
console.log(env);
if(env == "development") js = 'http://localhost:8080';
console.log(js);
app.use(express.static(path.resolve(__dirname, './public/assets')));
app.set('views', __dirname + '/public');
app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html', {
    buildLocation: js
  });
});

app.listen(3000, function() {
  console.log('Listening on port: ' + 3000);
});
