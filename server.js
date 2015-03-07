var express = require('express')
var app = express();

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname));

var server = app.listen(app.get('port'));

console.log('Climbing Memo app listening localhost at port ' + app.get('port'));
