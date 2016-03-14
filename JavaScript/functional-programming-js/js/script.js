
// flattens a nested array

Array.prototype.concatAll = function() {
	var results = [];
	this.forEach(function(subArray) {
        // this works because we push the array as parameters to push
        // instead of a single array to push
		results.push.apply(results, subArray);
	}); 0
	return results;
};

console.log(JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll()));
