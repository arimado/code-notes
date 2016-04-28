var http = require('http');

http.createServer(function(req, res) {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    switch(path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Homeboy');
            break;
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('about page');
            break;
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('404 page not found');
            break;
    }
}).listen(3000);

console.log('Server Started on test.loc brah');
