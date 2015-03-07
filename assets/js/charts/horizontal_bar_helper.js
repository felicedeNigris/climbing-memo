/**
 * Pre-process data to be rendered on a Horizontal bar chat
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getHorizontalBarData (rawData){

	var data = new Array();

	return data;
}

/**
 * Render horizontal bar chart on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawHorizontalBar (params) {

	var chart = getHorizontalBar()
		.data(getHorizontalBarData(params.data))
		.width($(params.containerSelector).width())
		.height(300);

	d3.select(params.containerSelector).call(chart);
}
