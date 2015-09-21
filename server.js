var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

app.get("/manifest.appcache", function(req, res){
  res.contentType("text/cache-manifest")
  res.sendFile('manifest.appcache', {'root': './'})
})

app.listen(process.env.PORT || 5000);
