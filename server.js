var gzippo = require('gzippo');
var express = require('express');
var morgan = require('morgan');
var app = express();

app.use(morgan('dev'));
app.use(gzippo.staticGzip("" + __dirname + "/dist"));

// app.get("/offline.manifest", function(req, res){
//   res.contentType("text/cache-manifest")
//   res.end("CACHE MANIFEST")
// })

app.listen(process.env.PORT || 5000);
