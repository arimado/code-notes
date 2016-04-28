var $ = require('jquery');

var button = $('<button/>').html('click this').on('click', function() {
        alert('hi');
});

$('body').append(button);

var requriedString = require('./hello.js');

console.log(requriedString); 
