function getCalendarHeatmapData (rawData){

	// Create hashmap of dates
	var dates = arrayToHashtable(rawData,'date');
	
	// Calculate metrics for dates
	var data = [];
	for (var key in dates){

		var routes = dates[key];

		var metrics = [];
		var climbs = arrayToHashtable(routes,'status');
		for (var status in climbs) {
			metrics.push({
				status: status,
				count: climbs[status].length
			});
		}
		metrics.sort(function (a,b) { return a.count < b.count; });

		data[key] = {
			date: key,
			total: dates[key].length,
			metrics: metrics
		};
	}

	console.log(data);
	return data;
}

function drawCalendarHeatmap (params) {

	// If width & height not defined, find largest

	var chart = getCalendarHeatmap()
		.data(params.data);

	d3.select(params.containerSelector).call(chart);
}
