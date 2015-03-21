var httpProxy = require('http-proxy');
var http = require('http');
var url = require('url');
var https = require('https');
var fs = require('fs');
 
var port = process.env.PORT || 8444;
 
var parseHostHeader = function (headersHost, defaultPort) {
    var hostAndPort = headersHost.split(':'),
        targetHost = hostAndPort[0],
        targetPort = parseInt(hostAndPort[1]) || defaultPort;

    return { hostname: targetHost, port: targetPort, host: headersHost };
}

var adjustRequestUrl = function (req) {
    //if (requestToProxyMirrorWebApp(req)) {
    //    req.url = req.url.replace(/http:\/\/localhost:8889\//, '/');
    //}
    req.url = url.parse(req.url).path;
};

//var proxy = httpProxy.createProxyServer({
//    changeOrigin: true,
//    xfwd: false,
//    secure: true
//});


http.createServer(function (req, res) {
   
    //var parsedHostHeader = parseHostHeader(req.headers['host'], 80);

    //console.log(req.headers['host']);

    //console.log(req.host);

    //console.log(req.url);

    adjustRequestUrl(req);

    //console.log(req.url);

   // proxy.web(req, res, { target: 'http://127.0.0.1:5060' });

    var protocal;
 
    if (req.url.match(/^https/)) {

        protocal = 'https://'

    } else if (req.url.match(/^http/)) {
        protocal = 'http://'
    }

    proxy.web(req, res, { target: 'http://' + req.headers['host'] });
   
})

    //.listen(9000);

 

var setup = require('proxy');

var server = setup(http.createServer());


server.listen(port, function () {
    var port = server.address().port;
    console.log('HTTP(s) proxy server listening on port %d', port);
});