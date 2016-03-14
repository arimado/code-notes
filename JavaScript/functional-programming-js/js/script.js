
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

JSON.stringify([ [1,2,3], [4,5,6], [7,8,9] ].concatAll());


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

     console.log(j)

	return movieLists // Complete this expression!

});

console.log((function() {
	var movieLists = [
			{
				name: "Instant Queue",
				videos : [
					{
						"id": 70111470,
						"title": "Die Hard",
						"boxarts": [
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/DieHard200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 654356453,
						"title": "Bad Boys",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys200.jpg" },
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" }

						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id:432534, time:65876586 }]
					}
				]
			},
			{
				name: "New Releases",
				videos: [
					{
						"id": 65432445,
						"title": "The Chamber",
						"boxarts": [
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/TheChamber200.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 4.0,
						"bookmark": []
					},
					{
						"id": 675465,
						"title": "Fracture",
						"boxarts": [
							{ width: 200, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture200.jpg" },
							{ width: 150, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
							{ width: 300, height:200, url:"http://cdn-0.nflximg.com/images/2891/Fracture300.jpg" }
						],
						"url": "http://api.netflix.com/catalog/titles/movies/70111470",
						"rating": 5.0,
						"bookmark": [{ id:432534, time:65876586 }]
					}
				]
			}
		];


	// Use one or more map, concatAll, and filter calls to create an array with the following items
	// [
	//     {"id": 675465,"title": "Fracture","boxart":"http://cdn-0.nflximg.com/images/2891/Fracture150.jpg" },
	//     {"id": 65432445,"title": "The Chamber","boxart":"http://cdn-0.nflximg.com/images/2891/TheChamber150.jpg" },
	//     {"id": 654356453,"title": "Bad Boys","boxart":"http://cdn-0.nflximg.com/images/2891/BadBoys150.jpg" },
	//     {"id": 70111470,"title": "Die Hard","boxart":"http://cdn-0.nflximg.com/images/2891/DieHard150.jpg" }
	// ];

	return movieLists.map(function (list) {
		return list.videos.map(function (movie) {
			return movie.boxarts.map(function (art) {
			   return art;
		   }).filter(function (art) {
			   return art.width === 150;
		   }).map(function (art){
			   return {"id": movie.id, "title": movie.title, "url" : art.url}
		   });
		}).concatAll();
	}).concatAll();
})());
