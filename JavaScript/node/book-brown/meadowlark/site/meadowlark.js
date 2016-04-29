var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

// Basically I think an error page for different status codes

// custom 404 page
app.use(function(req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found lol city');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(app.get('port'), function() {
    console.log('Express started on tests.loc:' + app.get('port') + '; press Ctrl-C to terminate.');
});
