// JS LIBRARY

JA = {};

var one23_OBJ = { one: 1, "two": 2, three: 3 };
var one23_ARR = [1, 2, 3];

var modifyVal = function (val) {
    return val + ' - modified';
}

// Most techniques used from the below function was stolen from:
// http://stackoverflow.com/questions/14810506/map-function-for-objects-instead-of-arrays

JA.MEGAMAP = function (collection, callback) {
    var isArray = Array.isArray(collection),
        isObject = ((collection === null) || isArray || typeof collection == 'function') ? false : (typeof collection == 'object'),
        dataType, result;

    // exit out and print error to console if not array or object
    if (!isArray && !isObject) return console.log('MEGAMAP only accepts Arrays or Objects');

    // use Object.create(null) to create an object that does not inherit any prototype
    isArray ? dataType = [] : dataType = Object.create(null);

    // use Object.keys and reduce to operate on both arrays and objects
    // Object.keys returns an array of keys for objects and indexes for arrays
    // Array.prototype.reduce can be used to push elements to an array or objects
    // when the initial value is either an array or object
    // you would then just use bracket notation to simulate pushing to the array/object

    result = Object.keys(collection).reduce(function(previous, current) {
        previous[current] = callback(collection[current]);
        return previous;
    }, dataType);

    return result;
};

var returnedObject = JA.MEGAMAP(one23_OBJ, modifyVal);

console.dir(returnedObject);
