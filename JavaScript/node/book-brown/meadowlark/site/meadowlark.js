var express = require('express');
var app = express();
var fortune = require('./lib/fortune.js'); // prefixed with dot or else     require would look in node-modules
var bodyparserInvoke = require('body-parser')(); // why is this invoked ??
                                                 // possibly becaause of the fact you are using it in app.use() middleware thingy?

var formidable = require('formidable');
var jqupload = require('jquery-file-upload-middleware');
var credentials = require('./credentials.js');
var cookieParserInvoke = require('cookie-parser')(credentials.cookieSecret);
var sessionInvoke = require('express-session')();

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

// ------------------------------------------------------
// Middleware tests *************************************
// ------------------------------------------------------


// app.use(function (req, res, next) {
//     console.log('processing request for ""' + req.url + '".......')
//     next();
// });
//
// app.use(function (req, res, next) {
//     console.log('terminating request');
//     res.send('thanks for palying!');
//
// });
//
// app.use(function (req, res, next) {
//     console.log('whoops, ill never get called!');
// }); 

// app.use(function (req, res, next) {             //LOG ALLWAYS
//     console.log('\n\nALLWAYS');
//     next();
// });
//
// app.get('/a', function(req, res, next) {              //terminates a
//     console.log('/a: route terminated');
//     res.send('a')
// });
//
// app.get('/a', function (req, res) {             //cant go back to a
//     console.log('/a: route terminated');
//     res.send('/a: never called');
// });
//
// app.get('/b', function (req, res, next) {       // Not terminated?
//     console.log('/b: route not terminated');
//     next();
// });
//
// app.use(function (req, res, next) {             //sometimes only gets logged on
//     console.log('SOMETIMES');                   // certain non terminated routes?
//     next();
// });
//
// app.get('/b', function (req, res, next) {       //why error? was thr route terminated?
//     console.log('/b (part 2): error thrown');
//     throw new Error('b failed');
// });
//
// app.use('/c', function (err, req) {             //error
//     console.log('/c: error thrown');
//     throw new Error('c failed');
// });
//
// app.use('/c', function (err, req, res, next) {                      //
//     console.log('unhandled error detected: ' + err.message);
//     res.send('500 - server error');
// });
//
// app.use(function(req, res) {
//     console.log('route not handled');
//     res.send('404 - not found');
// });

// app.listen(3000, function () {
//     console.log('listening on 3000');
// });










//  Cookies + Sessions

app.use(cookieParserInvoke);
app.use(sessionInvoke);

app.use(function (req, res, next) {
    res.locals.flash = req.session.flash;
    delete req.session.flash;
    next();
});

// for now, we're mocking NewsletterSignup:
function NewsletterSignup(){
}
NewsletterSignup.prototype.save = function(callback){
	callback();
};

var VALID_EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

app.post('/newsletter', function(req, res){
	var name = req.body.name || '', email = req.body.email || '';
	// input validation
	if(!email.match(VALID_EMAIL_REGEX)) {
		if(req.xhr) return res.json({ error: 'Invalid name email address.' });
		req.session.flash = {
			type: 'danger',
			intro: 'Validation error!',
			message: 'The email address you entered was  not valid.',
		};
		return res.redirect(303, '/newsletter/archive');
	}
	new NewsletterSignup({ name: name, email: email }).save(function(err){
		if(err) {
			if(req.xhr) return res.json({ error: 'Database error.' });
			req.session.flash = {
				type: 'danger',
				intro: 'Database error!',
				message: 'There was a database error; please try again later.',
			};
			return res.redirect(303, '/newsletter/archive');
		}
		if(req.xhr) return res.json({ success: true });
		req.session.flash = {
			type: 'success',
			intro: 'Thank you!',
			message: 'You have now been signed up for the newsletter.',
		};
		return res.redirect(303, '/newsletter/archive');
	});
});

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
    res.cookie('monster', 'nom nom');
    res.cookie('signed_monster', 'nom nom', { signed: true });
});

// about page
app.get('/about', function(req, res) {
    res.render('about', { fortune: fortune.getFortune(), pageTestScript: '/qa/tests-about.js' });
    var monster = req.cookies.monster;
    var signedMonster = req.signedCookies.signed_monster;
    console.log(monster);
    console.log(signedMonster);
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
