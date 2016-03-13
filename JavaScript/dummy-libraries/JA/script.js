// JS LIBRARY

JA = {};

// MEGA MAP
// takes an array/object and a mapped version of the input array/object
// - dont include prototype properties
//      - use hasOwnProperty to screen out of callback
//      -
// - don't let it accept anything other than an array/object
// - get rid of the else statement

JA.MEGAMAP = function (collection) {
    var result = [];
    if (Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i += 1) {
            result.push(callback(collection[i]));
        }
    } else {
        for (var key in collection) {
            result.push(callback(collection[key]));
        }
    }
    return result;
}
