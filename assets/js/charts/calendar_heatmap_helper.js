function getCalendarHeatmapData (rawData){

	// Create hashmap of dates
	var dates = arrayToHashtable(rawData,'date');
	
	// Calculate difficulty per climbing type
	var allClimbs = arrayToHashtable(rawData,'climb'); 
	var difficulties = [];

	for (var climb in allClimbs) 
		difficulties[climb] = arrayGroupBy(allClimbs[climb],'grade')
			.sort(function(a,b) { return a < b});

	// Calculate metrics at dates for each climb type
	var data = [];
	for (var key in dates){

		var routes = dates[key];

		var metrics = [];
		var dayClimbs = arrayToHashtable(routes,'climb');
		for (var climb in dayClimbs) {
			
			var routes = dayClimbs[climb];
			routes.sort(function(a,b) { return a.grade < b.grade });

			var hardestRoute = routes[0];
		
			var position = difficulties[hardestRoute.climb].indexOf(hardestRoute.grade);
			var ease = Math.abs(parseFloat(position)/allClimbs[climb].length);

			if (!hardestRoute.grade)
				hardestRoute.grade = '';

			metrics.push({
				climb: hardestRoute.climb,
				grade: hardestRoute.grade,
				status: hardestRoute.status,
				ease: ease,
				count: dayClimbs[climb].length
			});
		}
		metrics.sort(function (a,b) { return a.count < b.count; });

		data[key] = {
			date: key,
			total: dates[key].length,
			metrics: metrics
		};
	}

	return data;
}

function drawCalendarHeatmap (params) {

	// If width & height not defined, find largest

	var chart = getCalendarHeatmap()
		.data(params.data);

	d3.select(params.containerSelector).call(chart);
}
