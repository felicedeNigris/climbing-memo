var express = require('express')
var app = express()

app.set('port', (process.env.PORT || 3000))
app.use(express.static(__dirname))

app.get("/offline.manifest", function(req, res){
  res.contentType("text/cache-manifest")
  res.end("CACHE MANIFEST")
})

var server = app.listen(app.get('port'))

console.log('Climbing Memo app listening localhost at port ' + app.get('port'))
