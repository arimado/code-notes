// JS LIBRARY

JA = {};

// MEGA MAP
// takes an array or object and maps it to the
// 11.59

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
