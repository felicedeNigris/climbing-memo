/**
 * Pre-process data to be rendered on a Map
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array of locations
 */
function getMapChartData (rawData) {

	console.log(utils);
	// Create hashmap of sites
	var locations = utils.arrayToHashtable(rawData,'location');

	// Calculate metrics for sites
	var data = [];
	for (var key in locations){

		var routes = locations[key];

		var metrics = [];
		var types = utils.arrayToHashtable(routes,'type');
		for (var type in types) {
			metrics.push({
				type: type,
				count: types[type].length
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

/**
 * Render google map on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawMapChart (params) {
	
	var chart = getMapChart()
		.data(params.data);

	chart(params.containerId);
}

// Export interface for Mocha tests
if (typeof module !== 'undefined')
{
	module.exports.mapHelper = {
		getMapChartData: getMapChartData
	};
}
