var Browser = require('zombie');
var assert = require('chai').assert // what's going on here mate?

var browser;

suite('Cross-Page Tests', function () {
    // OOAAH
    setup(function () {
        browser = new Browser();
    });

    test('requesting hood-river should populate the refferrer', function(done) {
        var referrer = 'http://test.loc:3000/tours/hood-river';
        browser.visit(referrer, function() {
            console.log('visited!');
            browser.clickLink('.requestGroupRate', function() {
                console.log('clicked the link!');
                assert(browser.resources[0].request.headers._headers[0][1] === referrer);
                done();
            });
        });
    });

    test('requesting from oregon should populate the referrer', function(done){
        var referrer = 'http://test.loc:3000/tours/oregon-coast';
        browser.visit(referrer, function() {
            browser.clickLink('.requestGroupRate', function() {
                assert(browser.resources[0].request.headers._headers[0][1] === referrer);
                done();
            });
        });
    });

    test('visiting the "request group thing" should NOT populate the referrer',
    function(done){
        var referrer = 'http://test.loc:3000/tours/request-group-rate';
        browser.visit(referrer, function() {
            browser.clickLink('.requestGroupRate', function() {
                assert(browser.field('referrer').value === '');
                done();
            });
        });
    });
});
