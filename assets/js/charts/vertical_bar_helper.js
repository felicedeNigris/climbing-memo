/**
 * Pre-process data to be rendered on a Vertical bar chat
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getVerticalBarData (rawData){

	var data = new Array();

	return data;
}

/**
 * Render vertical bar chart on the DOM
 *
 * @params {Object} Parameters of the chart
 */
function drawVerticalBar (params) {

	var chart = getVerticalBar()
		.data(params.data)
		.width($(params.containerSelector).width())
		.height(300);

	d3.select(params.containerSelector).call(chart);
}
