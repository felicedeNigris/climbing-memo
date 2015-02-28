
/**
 * Create and return a Calendar Heatmap chart
 *
 * @return {Function} Callable object to create chart
 */
function getCalendarHeatmap () {

	var rawData = [];
	var cellSize = 13;

	function my(container) {

		// Process data
		var data = getCalendarHeatmapData(rawData);

		var day = d3.time.format("%w"),
			week = d3.time.format("%U"),
			format = d3.time.format("%d/%m/%Y");

		var color = function (ease) {
			switch (ease) {
				case 0: case 1: return '#3460cf';
				case 2: case 3: return '#446cd3';
				case 4:	case 5: return '#5479d7';
				case 6:	case 7: return '#6485da';
				case 8:	case 9: return '#7392de';
				case 10: default:  return '#839ee2';
			}
		};

		container.select("svg").remove();

		var endDate = new Date();
		var startDate = new Date(endDate.getFullYear()-1,endDate.getMonth(),endDate.getDate()+1);

		var width = 54 * cellSize + 10;
		var height = cellSize*8+10;

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


		var rect = svg.selectAll(".emptyDay")
			.data(function(d) { return d3.time.days(startDate, endDate); })
			.enter().append("rect")
			.attr("class", "emptyDay")
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
			.attr("class", "climbDay")
			.style('fill', function (d) {
				var ease = parseInt(data[d].metrics[0].ease * 10);
				return color(ease);
			})
			.select("title")
			.text(function(d) {
				var metric = data[d].metrics[0];
				var string =  
					metric.grade+ ' ' +
					metric.status + ' ('+
					metric.type + ') on ' + d;

					return string;
			});


		createLegend();
		applyStyle();

		function applyStyle ()
		{
			svg.selectAll('.emptyDay').style({
				'fill': '#fff',
				'stroke': '#ccc'
			});

			svg.selectAll('rect').style({
				'shape-rendering': 'crispEdges'
			});
			
			svg.selectAll('text').style({
				'font': '12px sans-serif',
				'fill': 'gray'
			});
		}

		function createLegend () {

			svg.append("text")
				.attr("transform", "translate(0," + (2 + cellSize * 8) + ")")
				.text('Summary of climbs over the last year');
			
			// Difficulty legend
			var xPos = 490;
			svg.append("text")
				.attr("transform", "translate("+ xPos +"," + (2 + cellSize * 8) + ")")
				.text('Difficulty: Less');
		
			var legendDays = [10,8,6,4,2,1];
			var rect = svg.selectAll(".legendDay")
				.data(legendDays)
				.enter().append("rect")
				.attr("width", cellSize)
				.attr("height", cellSize)
				.attr("x", function (d) {
					var numRect = legendDays.indexOf(d);
					return xPos + 80 + cellSize * numRect + numRect * 2;
				})
				.attr("y",  cellSize * 8 - 8)
				.style("fill", function (d) {
					return color(d);
				});

			svg.append("text")
				.attr("transform", "translate("+ (xPos + cellSize * 6 + 93 ) +"," + (2 + cellSize * 8) + ")")
				.text('more');
		}
	}

	my.data = function (value) {
		if (!arguments.length) return rawData;
		rawData = value;
		return my;
	};

	my.cellSize = function(value) {
		if (!arguments.length) return cellSize;
		cellSize = value;
		return my;
	};

	return my;
}

