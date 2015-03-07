var express = require('express')
var app = express();

app.use(express.static(__dirname));

var server = app.listen(80,'climbing-memo.herokuapp.com');

console.log('Climbing Memo app listening');
