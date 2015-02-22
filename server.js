var express = require('express')
var app = express();

app.use(express.static(__dirname));

var server = app.listen(3000);

console.log('Climbing Memo app listening at http://localhost:3000');
