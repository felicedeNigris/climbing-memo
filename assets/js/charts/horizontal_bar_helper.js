/**
 * Pre-process data to be rendered on a Horizontal bar chat
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getHorizontalBarData (rawData,type){

	// Filter by Type
	rawData = rawData.filter(function (d) { return d.type == type});

	// Group by Grade
	var grades = arrayToHashtable(rawData,'grade');
	
	// Convert to array
	var data = new Array();
	for (var grade in grades) {
		data.push({
			name: type,
			grade: grade,
			total: grades[grade].length
		});
	}

	// Sort by grade
	data = data.sort(function(a,b) { return compareRouteGrade(a.grade,b.grade) });
	
	return data;
}

/**
 * Render horizontal bar chart on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawHorizontalBar (params) {

	var chart = getHorizontalBar()
		.data(getHorizontalBarData(params.data,params.type))
		.width($(params.containerSelector).width())
		.height(300);

	d3.select(params.containerSelector).call(chart);
}
