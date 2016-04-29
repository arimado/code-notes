var http = require('http');


var serverStaticFile = function (res, path, contentType, responseCode) {
    if(!responseCode) responseCode = 200;
    fs.readFile(_dirname + path, function(err, data){
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
            serverStaticFile(res, '/public/')
            break;
        case '/about':
            break;
        default:
            break;
    }
}).listen(3000);

console.log('Server Started on test.loc brah');
