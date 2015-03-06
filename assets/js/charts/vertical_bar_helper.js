/**
 * Pre-process data to be rendered on a Vertical bar chat
 *
 * @params {Array} Flat routes objects
 * @return {Array} Array indexed by dates
 */
function getVerticalBarData (rawData){


	// Group by Month-Year
	var months = new Array();

	for (var i=0 ; i < rawData.length ; i++) {
		
		var route = rawData[i];

		// Date format DD/MM/YYYY
		var splitDate = route.date.split("/");
		var monthDate = splitDate[1] + splitDate[2];

		// Month name
		if (!(monthDate in months)) {
			months[monthDate] = { 
				date:monthDate,
				sectors: []
			};
		}

		// Sector name in month
		var month = months[monthDate];

		if (! (route.sector in month.sectors)) {
			month.sectors[route.sector] = {
				sum: 0,
				y0: 0,
				y1: 0
			};
		}

		month.sectors[route.sector].sum += 1;

	}

	// Sort by sector sum TODO

	// Calculate y0 & y1 per sector
	for (monthDate in months) {

		var month = months[monthDate];
		var barSum = 0;

		for (sector in month.sectors) {
		
			var barItem = month.sectors[sector];

			barItem.y0 = barSum;
			barSum += barItem.sum;
			barItem.y1 = barSum;
		}
	}

	// Convert Object to Array
	var data = new Array();
	var data = Object.keys(months).map(function(keyA) { 
		var entry = months[keyA];
		entry.sectors = Object.keys(entry.sectors).map(function(keyB) { 
			return entry.sectors[keyB] 
		});
		return entry;
	});

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
