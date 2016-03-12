// JEREMY ARIMADO
// jarimado@gmail.com
// +61421676516

var myArray = [1, 2, 3, 4, 5];

var myObject = {}; 

myObject.name = "Jeremy Arimado";
myObject.email = "jarimado@gmail.com";
myObject.mobile = "+61421676516"; 

myObject['hairColor'] = 'black';

var print = function (val) {
	console.log(val);
}

print(myArray[1]); 

print(myObject.name); 


// You are going to write an `each` function which takes a collection and an callback function and 
// invokes the callback function on each item in the collection.

// Here are 2 example use cases of `each`. Use these examples as guidance for how an implementation of 
// `each` should behave.

// First of all, `each` should be able to handle arrays:

var scores = [10345, 23432, 333356];

var printScore = function (score) {
  console.log(score);
};

each(scores, printScore);

// The following would be logged to the console:
// 10345
// 23432
// 333356


// Secondly, `each` should also be able to handle objects:

var capitals = {
  California: 'Sacramento',
  Vermont: 'Montpelier',
  Arizona: 'Phoenix'
};

var printCapital = function (capital) {
  console.log(capital);
}

each(capitals, printCapital);

// The following would be logged to the console:
// 'Sacramento'
// 'Montpelier'
// 'Phoenix'

var each = function (collection, callback) {
  if (Array.isArray(collection)) {
  	for (var i = 0; i < collection.length; i += 1) {
    	callback(collection[i]); 
    }
  } else {
    for (var i in collection) {
      callback(collection[i]); 
    }
  }
};

// Use your implementation of `each` to log each element of `myArray`, which you created above:

each(myArray, print); 

// Use your implementation of `each` to log each value of `myObject`, which you created above:
 
 each(myObject, function(val) {
	console.log(val); 
 }); 

// Here is an example use case of `map`. Use this example as guidance for how an implementation of 
// `map` should behave.

var allottedMinutes = [15, 20, 32];

var double = function (num) {
  return num * 2;
};

var doubledAllottments = map(allottedMinutes, double);
console.log(doubledAllottments); // logs [30, 40, 64]

/*
Please walk though, line by line, what is happening in the following function.
Be as clear as possible in your descriptions about what is happening in the code.
If you find any bugs:
  - Say what would happen if the bug remained (in other words, why is it a bug?)
  - Say what needs to happen instead.
  - Propose how to go about making that happen.
  - Put your thinking into action and make any changes necessary to make the function work as intended.
*/

var map = function (collection, callback){
    var result = [];
    each(collection, callback); 
    return result; 
};
  


var map = function (collection, callback) {
	var result = [];  
}; 



// ------------------------------------------------
// *************************************************
// *************************************************
// Post interview **********************************
// *************************************************
// *************************************************

var each = function (collection, callback) {
    if (Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i += 1) {
            callback(collection[i]); 
        }
    } else {
        for (var key in collection) {
            callback(collection[key]); 
        }
    }
};

var jaMap = function (collection, callback) {
    var result = []; 
    each(collection, callback); 
    return result; 
};

var printScore = function (score) {
  console.log(score);
};

// Stuck here 

// -----------------------------------------


// Implement map function that takes either array or object. 

var jaMap2 = function (collection, callback) {
    var result = []; 
    if (Array.isArray(collection)) {
        for(var i = 0; i < collection.length; i += 1) {
            results.push(callback(collection[i])); 
        }
    } else {
        for (var key in collection) {
            results.push(callback(collection[key])); 
        }
    } 
    return results; 
}

























