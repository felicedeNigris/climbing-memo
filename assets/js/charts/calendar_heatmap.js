function getCalendarHeatmap () {

	var rawData = [];
	var width = 800;
	var cellSize = 14;
	var height = cellSize*8;

	function my(container) {

		// Process data
		var data = getCalendarHeatmapData(rawData);


		var day = d3.time.format("%w"),
			week = d3.time.format("%U"),
			format = d3.time.format("%d/%m/%Y");


		container.select("svg").remove();

		var endDate = new Date();
		var startDate = new Date(endDate.getFullYear()-1,endDate.getMonth(),endDate.getDate()+1);

		var svg = container.append("svg")
			.data([1])
			.attr("width", width)
			.attr("height", height)
			.attr("class", "RdYlGn")
			.append("g");

		svg.append("text")
			.attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
			.style("text-anchor", "middle")
			.text(function(d) { return d; });

		var rect = svg.selectAll(".day")
			.data(function(d) { return d3.time.days(startDate, endDate); })
			.enter().append("rect")
			.attr("class", "day")
			.attr("width", cellSize)
			.attr("height", cellSize)
			.attr("x", function(d) { 

				var dist = (endDate.getFullYear() == d.getFullYear()) ?
					1+ parseInt(week(endDate)) - parseInt(week(d)):
					53-parseInt(week(d)) + parseInt(week(endDate));

				return (53-dist) * cellSize;
			})
			.attr("y", function(d) { return day(d) * cellSize; })
			.datum(format);

		rect.append("title")
			.text(function(d) { return d; });

		rect.filter(function(d) { return d in data; })
			.attr("class", function(d) { return  'day climb '+data[d].metrics[0].status})
			.select("title")
			.text(function(d) {
				var metric = data[d].metrics[0];
				return d + ": " + data[d].total+ ' climb ('+metric.count + ' '+metric.status+')';
			});


		applyStyle();

		function applyStyle ()
		{
			svg.selectAll('.day').style({
				'fill': '#fff',
				'stroke': '#ccc'
			});

			svg.selectAll('.day.Attempt').style({'fill': 'gray'});
			svg.selectAll('.day.Redpoint').style({'fill': 'red'});
			svg.selectAll('.day.Flash').style({'fill': 'orange'});
			svg.selectAll('.day.Onsight').style({'fill': 'yellow'});

			svg.selectAll('rect').style({
				'shape-rendering': 'crispEdges'
			});
		}
	}

	my.data = function (value) {
		if (!arguments.length) return rawData;
		rawData = value;
		return my;
	};

	my.width = function(value) {
		if (!arguments.length) return width;
		width = value;
		return my;
	};

	my.height = function(value) {
		if (!arguments.length) return height;
		height = value;
		return my;
	};

	my.cellSize = function(value) {
		if (!arguments.length) return cellSize;
		cellSize = value;
		return my;
	};

	return my;
}

