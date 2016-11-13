var http = require('http');
var setup = require('proxy');
var express = require('express');


var port = process.env.PORT || 18080;
var server = setup(http.createServer());

/* 提取原有的 onRequest */
var onRequest = server.listeners('request')[0];
server.removeListener('request', onRequest);

var app = express();

app.get('/', function (req, res) {
    res.end('hello world');
});

server.on('request', function (req, res) {

    console.log(req.url);

    if (req.url.indexOf('/') === 0) {
        app(req, res);
    } else {
        onRequest(req, res);
    }
});


server.on('connect', function(req, cltSocket, head) {
    console.log(req);
})


server.listen(port, function () {
    console.log('listening on port %d', port);
});