
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


// Project and Flatten array using nested maps and

(function () {
	var movieLists = [
			{
				name: "New Releases",
				videos: [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxart": "http://cdn-0.nflximg.com/images/2891/DieHard.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxart": "http://cdn-0.nflximg.com/images/2891/BadBoys.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id:432534, time:65876586 }]
					}
				]
			},
			{
				name: "Dramas",
				videos: [
					{
						"id": 65432445,
						"title": "The Chamber",
						"boxart": "http://cdn-0.nflximg.com/images/2891/TheChamber.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 675465,
						"title": "Fracture",
						"boxart": "http://cdn-0.nflximg.com/images/2891/Fracture.jpg",
						"uri": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id:432534, time:65876586 }]
					}
				]
			}
		];

	// ------------   INSERT CODE HERE!  -----------------------------------
	// Use map and concatAll to flatten the movieLists in a list of video ids.


    var j = movieLists.map(function (list) {
        // why do you need to return here?
        // because it needs something to return so it can push?
        // because the inner function returns something, but it is not used anywhere outside itself
         return list.videos.map(function (video){
             console.log(video.id);
             return video.id;
         });
     }).concatAll()

	// ------------   INSERT CODE HERE!  -----------------------------------

	return movieLists // Complete this expression!

})();
