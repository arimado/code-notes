var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js'); // prefixed with dot or else require would look in node-modules
var bodyparserInvoke = require('body-parser')(); // why is this invoked ???
var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');

var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    helpers: {
        section: function(name, options) {
            if(!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
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

// jQuery file upload

app.use('/upload', function(req, res, next){
    var now = Date.now();
    jqupload.fileHandler({
    uploadDir: function(){
        return __dirname + '/public/uploads/' + now;
    },
    uploadUrl: function(){
        return '/uploads/' + now; },
    })(req, res, next); // self-invoked with req,res,next
});


// Bodyparser
app.use(bodyparserInvoke);

app.get('/newsletter', function(req, res) {
    res.render('newsletter', {csrf: 'CSRF Token goes here'});
});

app.post('/process', function(req, res){
    if(req.xhr || req.accepts('json,html') === 'json'){
        // if there were an error, we would send { error: 'error description' }
        res.send({ success: true });
        console.log('req.query.form: ' + req.query.form);
        console.log('req.body._csrf :' + req.body._csrf);
        console.log('req.body.name: ' + req.body.name);
        console.log('req.body.email: ' + req.body.email);

    } else {
        // if there were an error, we would redirect to an error page
        console.log('req.query.form: ' + req.query.form);
        console.log('req.body._csrf :' + req.body._csrf);
        console.log('req.body.name: ' + req.body.name);
        console.log('req.body.email: ' + req.body.email);
        res.redirect(303, '/thank-you');
    }
});

app.get('/thank-you', function(req, res) {
    res.render('thank-you');
});


// Vaction photo
app.get('/contest/vacation-photo',function(req,res){
    var now = new Date();
    res.render('contest/vacation-photo',{
            year: now.getFullYear(),
            month: now.getMonth()
    });
});

app.post('/contest/vacation-photo/:year/:month', function(req, res){
    var form = new formidable.IncomingForm();
    form.parse(req, function(err, fields, files){
        if(err) return res.redirect(303, '/error');
        console.log('received fields:');
        console.log(fields);
        console.log('received files:');
        console.log(files);
        res.redirect(303, '/thank-you');
    });
});


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

// jquery-test page
app.get('/jquery-test', function(req, res) {
    res.render('jquery-test');
});

// nursery-rhyme page

app.get('/nursery-rhyme', function(req, res){
    res.render('nursery-rhyme');
});

app.get('/data/nursery-rhyme', function(req, res){
    res.json({
        animal: 'squirrel',
        bodyPart: 'tail',
        adjective: 'bushy',
        noun: 'heck',
    });
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
