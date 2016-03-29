// Says hello

(function(){
    alert('hello added as a dependency')
})();

var hello = function() {
    return 'this is a string';
}


module.exports = hello()
