// JS LIBRARY

JA = {};

var one23_OBJ = { one: 1, "two sd": 2, three: 3 };
var one23_ARR = [1, 2, 3];


// MEGA MAP
// takes an array/object and a mapped version of the input array/object
// - dont include prototype properties
//      - use hasOwnProperty to screen out of callback
//      -asd
// - don't let it accept anything other than an array/object
// - get rid of the else statement


var modifyVal = function (val) {
    return val + ' - modified';
}

JA.isPlainObject = function (o) {
   return ((o === null) || Array.isArray(o) || typeof o == 'function') ?
          false
          :(typeof o == 'object');
}

JA.MEGAMAP = function (collection, callback) {
    var result;
    if (Array.isArray(collection)) {
        result = [];
        for(var i = 0; i < collection.length; i += 1) {
            result.push(callback(collection[i]));
        }
    } else if (JA.isPlainObject(collection)) {
        result = {};
        for (var key in collection) {
            result[key] = callback(collection[key]);
        }
    } else {
        console.log('MEGAMAP only accepts Arrays or Objects');
    }
    return result;
}; 

console.dir(JA.MEGAMAP(one23_OBJ, modifyVal));
