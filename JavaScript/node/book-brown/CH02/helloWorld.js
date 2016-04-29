var http = require('http'); // What is this?
var fs = require('fs');     // What is fs?

var serverStaticFile = function (res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data){
        if (err) {
            res.writeHead(500, {'Content-Type':'text/plain'});
            res.end('500 - ERROR BRAH!');
        } else {
            res.writeHead(responseCode, {'Content-Type':contentType});
            res.end(data);
        }
    });
};

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            serverStaticFile(res, '/public/home.html', 'text/html');
            break;
        case '/about':
            serverStaticFile(res, '/public/about.html', 'text/html');
            break;
        case '/img/logo.jpg':
            serverStaticFile(res, '/public/img/logo.jpg', 'image/jpeg');
            break;
        default:
            serverStaticFile(res, '/public/404.html', 'text/html');
            break;
    }
}).listen(3000);

console.log('Server Started on test.loc brah');
