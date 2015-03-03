/**
 * Pre-process data to be rendered on a Calendar Heatmap
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getCalendarHeatmapData (rawData){

	// Create hashmap of dates
	var dates = arrayToHashtable(rawData,'date');
	
	// Calculate difficulty per climbing type (sorted hardest to easiest)
	var allTypes = arrayToHashtable(rawData,'type'); 
	var difficulties = [];

	for (var type in allTypes) {
		difficulties[type] = arrayGroupBy(allTypes[type],'grade')
			.sort(function(a,b) { return !compareRouteGrade(a,b) });
	}
	

	// Calculate metrics at dates for each climbing type
	var data = [];
	for (var key in dates){

		var routes = dates[key];

		var metrics = [];
		var dayTypes = arrayToHashtable(routes,'type');
		for (var type in dayTypes) {
			
			var typeRoutes = dayTypes[type];
			typeRoutes.sort(function(a,b) { return !compareRouteGrade(a.grade ,b.grade) });

			// Routes sorted hardest to easiest
			var hardestRoute = typeRoutes[0];
		
			var position = difficulties[hardestRoute.type].indexOf(hardestRoute.grade);
			var ease = Math.abs(parseFloat(position)/allTypes[type].length);

			if (!hardestRoute.grade) {
				hardestRoute.grade = '';
			}

			metrics.push({
				type: hardestRoute.type,
				grade: hardestRoute.grade,
				status: hardestRoute.status,
				ease: ease,
				count: dayTypes[type].length
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

/**
 * Render calendar heatmap chart on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawCalendarHeatmap (params) {

	var chart = getCalendarHeatmap()
		.data(params.data)
		.cellSize(params.cellSize);

	d3.select(params.containerSelector).call(chart);
}

// Export interface for Mocha tests
if (typeof module !== 'undefined')
{
	module.exports.calendarHeatmapHelper = {
		getCalendarHeatmapData: getCalendarHeatmapData
	};
}
