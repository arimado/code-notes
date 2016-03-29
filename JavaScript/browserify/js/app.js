var $ = require('jquery');

var button = $('<button/>').html('click this').on('click', function() {
        alert('hi');
});

$('body').append(button);

console.log('sup');
