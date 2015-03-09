function getHorizontalBar(data) {

	var data = [];
	var width = 800;
	var height = 600;
	var heightBar = 40;

	function my (container) {

		var typeColor = function (type) {
			switch (type) {
				case 'Sport lead':	return 'gold';
				case 'Boulder':		return 'lightskyblue';
				case 'Traditional':	return 'lightgreen';
				case 'Multi-pitch':	return 'sandybrown';
				case 'Top rope':	return 'lightgray';
				default :			return 'lightgray';
			};
		};

		setDimensions();
		setupAxis();

		addSvgChart();
		addBarChartData();
		addAxes();

		applyStyle();

		var margin,heightChart,widthChart;

		function setDimensions()
		{
			margin = {top: 30, right: 10, bottom: 10, left: 10};
			widthChart = width - margin.left - margin.right;
			heightChart = data.length * heightBar - margin.top - margin.bottom;
		}


		var xAxis, xScale, yScale, maxRoutes;

		function setupAxis()
		{
			maxRoutes = d3.max(data, function(d) { return d.total});

			xScale = d3.scale.linear()
				.range([0, widthChart])
				.domain([-maxRoutes,maxRoutes]);

			yScale = d3.scale.ordinal()
				.rangeRoundBands([0, heightChart], .1)
				.domain(data.map(function(d) { return d.grade; }));

			xAxis = d3.svg.axis()
				.scale(xScale)
				.tickFormat( function (d) { return (d%1 == 0) ? Math.abs(d) : '' })
				.orient("top");
		}

		var svg,div;

		function addSvgChart()
		{
			container.select("svg").remove();

			svg = container.append("svg")
				.attr("width", width)
				.attr("height", height)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			div = d3.select("body").append("div")   
				.attr("class", "tooltip")               
				.style("opacity", 0);
		}



		function addBarChartData() 
		{
			if (data.length == 0)
				return;

			// Create rects
			svg.selectAll(".bar")
				.data(data)
				.enter().append("rect")
				.attr("x", function(d) { return xScale(-d.total); })
				.attr("y", function(d) { return yScale(d.grade); })
				.attr("width", function(d) { return xScale(d.total) - xScale(-d.total) })
				.attr("height", yScale.rangeBand())
				.style("fill", function (d) { return typeColor(d.name) })
				.on("mousemove", function(d) { 

					div.style("background",typeColor(d.name));   
					div.transition().duration(200).style("opacity", .8);
					div.html(d.grade + ' - ' +d.name);
					div.style("font-weight","bold");
					div.style("color","black");
					div.style("left", (event.pageX) + "px");
					div.style("top", (event.pageY-20)  + "px");

				})
				.on("mouseout", function(d) {       
					div.transition()        
					.duration(800)      
					.style("opacity", 0);   
				});
		}

		function addAxes() 
		{
			if (data.length == 0)
				return;

			svg.append("g")
				.attr("class", "x axis")
				.call(xAxis);

			svg.append("g")
				.attr("class", "y axis")
				.append("line")
				.attr("x1", xScale(0))
				.attr("x2", xScale(0))
				.attr("y2", heightChart);
		}

		function applyStyle ()
		{
			svg.selectAll('.axis line, path').style({
				'stroke': 'Black',
				'fill': 'none',
				'stroke-width': '1px',
				'shape-rendering':'crispEdges'
			});

		}

		return my;
	};

	my.data = function (value) {
		if (!arguments.length) {
			return data;
		}
		data = value;
		return my;
	};

	my.width = function(value) {
		if (!arguments.length) {
			return width;
		}
		width = value;
		return my;
	};

	my.height = function(value) {
		if (!arguments.length) {
			return height;
		}
		height = value;
		return my;
	};
	return my;
}
