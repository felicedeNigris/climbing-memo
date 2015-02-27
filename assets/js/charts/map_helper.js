function getMapChartData (rawData) {

	// Create hashmap of sites
	var locations = arrayToHashtable(rawData,'location');

	// Calculate metrics for sites
	var data = [];
	for (var key in locations){

		var routes = locations[key];

		var metrics = [];
		var climbs = arrayToHashtable(routes,'climb');
		for (var type in climbs) {
			metrics.push({
				type: type,
				count: climbs[type].length
			});
		}
		metrics.sort(function (a,b) { return a.count < b.count; });

		data.push({
			name: key,
			latitude: routes[0].latitude,
			longitude: routes[0].longitude,
			metrics: metrics 
		});
	}

	return data;
}

function drawMapChart (params) {
	
	var chart = getMapChart()
		.data(params.data);

	chart(params.containerId);
}
