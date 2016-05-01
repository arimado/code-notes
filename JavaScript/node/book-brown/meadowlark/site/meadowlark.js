var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js'); // prefixed with dot or else require would look in node-modules

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return options.fn();
        },
        testHelper: function(p1, p2, p3) {
            return 'testHelper:';
        }
    }
});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.set('port', process.env.PORT || 3000);

app.use(function(req, res, next) {
    var isTesting = app.get('env') !== 'production' && req.query.test === '1';
    res.locals.showTests = isTesting;
    next();
})

// ****************************************
// LOGIC ----------------------------------
// ****************************************

var getWeatherData = function () {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0 F (12.8 C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0 F (12.8 C)'
            }

        ]
    };
};

// ****************************************
// ROUTES ---------------------------------
// ****************************************

// add routes for the home page and about age
app.get('/', function(req, res){
    res.render('home', getWeatherData());
});

// about page
app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' });
});

// hood-river page
app.get('/tours/hood-river', function(req, res) {
    res.render('tours/hood-river');
});

// request-group-rate page
app.get('/tours/request-group-rate', function(req, res) {
    res.render('tours/request-group-rate');
});

// oregon-coast page
app.get('/tours/oregon-coast', function(req, res) {
    res.render('tours/oregon-coast');
});

// ****************************************
// MIDDLEWARE -----------------------------
// ****************************************

app.use(function(req, res, next){
    if(!res.locals.partials) res.locals.partials = {};
    res.locals.partials.weather = getWeatherData();
    next();
});

// ****************************************
// HANDLERS -------------------------------
// ****************************************

// Basically I think an error page for different status codes
// custom 404 page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

// custom 500 page
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function() {
    console.log('Express started on tests.loc:' + app.get('port') + '; press Ctrl-C to terminate.');
});
