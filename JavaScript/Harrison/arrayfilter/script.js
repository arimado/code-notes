console.log('script.js init');

// Harrison Problem

// Write a function remove_duplicates that takes in a list and removes elements of the list that are the same.
//
// For example: remove_duplicates([1,1,2,2])
// should return [1,2].
//
// Don't remove every occurrence, since you need to keep a single occurrence of a number.
// The order in which you present your output does not matter. So returning [1,2,3] is the same as returning [3,1,2].
// Do not modify the list you take as input! Instead, return a new list.

var isUnique = function (currentVal, uniqueValues) {
    if (uniqueValues.length === 0) return true;
    if (uniqueValues.length > 0) {
        console.log('isUnique called');
        for (var i = 0; i < uniqueValues.length; i++) {
            if (currentVal === uniqueValues[i]) {
                return false
            }
        }
        return true;
    }
}

var removeDuplicates = function (values) {
    var uniqueValues = [], currentVal;
    for (var i = 0; i < values.length; i++) {
        currentVal = values[i];
        if (isUnique(currentVal, uniqueValues)) {
            uniqueValues.push(values[i]);
        }
    }
    return uniqueValues;
} 

console.log(removeDuplicates([1, 2, 2, 2, 5, 6, 6, 7, 7, 7, 7, 7, 7]));

//[1, 2, 5, 6, 7]
