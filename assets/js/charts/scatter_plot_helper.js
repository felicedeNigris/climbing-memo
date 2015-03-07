
/**
 * Pre-process data to be rendered on a Scatter Plot
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getScatterPlotData (rawData){

	// Create hashmap of sectrs
	var sectors = arrayToHashtable(rawData,'sector');

	var data = new Array();

	for (var key in sectors)
	{
		var sector = sectors[key];

		// Calculate dominant type
		var types = arrayGroupBy(sector,'type');

		// Calculate rating average
		var sumRating = 0;
		for (var i=0 ; i < sector.length ; i ++) 
			sumRating += parseInt(sector[i].rating);

		var avgRating = parseFloat(sumRating) / sector.length;

		data.push({
			sector: key,
			avgRating:  avgRating,
			dominantType: types[0],
			totalRoutes: sector.length
		});
	}


	return data;
}

/**
 * Render scatter plot chart on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawScatterPlot (params) {

	var chart = getScatterPlot()
		.data(getScatterPlotData(params.data))
		.width($(params.containerSelector).width())
		.height(300);

	d3.select(params.containerSelector).call(chart);
}
