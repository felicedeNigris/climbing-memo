function getScatterPlot(data) {

	var data = [];
	var width = 800;
	var height = 600;

	function my (container) {

		var marginFocus = {top: 20, right: 25, bottom: 30, left: 50},
			widthChart      = width - marginFocus.left - marginFocus.right,
			heightChart     = height - marginFocus.top - marginFocus.bottom;

		var xFocus = d3.scale.linear().range([0, widthChart]),
			yFocus = d3.scale.linear().range([heightChart, 0]);

		var xAxisFocus = d3.svg.axis()
			.scale(xFocus)
			.orient("bottom")
			.tickFormat(d3.format("d"));

		var yAxisFocus = d3.svg.axis()
			.scale(yFocus)
			.orient("left")
			.tickFormat(d3.format("d"));

		var focus;

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

		//REMOVE SVG
		container.select("svg").remove();

		// CREATE NEW SVG
		var svg = container.append("svg")
			.attr("width", width)
			.attr("height", height);

		focus = svg.append("g")
			.attr("transform", "translate(" + marginFocus.left + "," + marginFocus.top + ")");

		// CREATE DOMAIN
		xFocus.domain([0,d3.max(data, function(d) { return d.totalRoutes })]);
		yFocus.domain([0,5]);

		// TOOLTIP DIV
		var div = d3.select("body").append("div")   
			.attr("class", "tooltip")               
			.style("opacity", 0);

		// DOTS
		focus.selectAll(".dot")
			.data(data)
			.enter()
			.append("circle")
			.attr("class", "dot-usage")
			.attr("r", 6)       
			.attr("cx", function(d) { return xFocus(d.totalRoutes) } )
			.attr("cy", function(d) { return yFocus(d.avgRating) } )
			.style("fill", function(d) { return typeColor(d.dominantType); })
			.on("mouseover", function(d) {      
				div.style("background", typeColor(d.dominantType))
				div.transition()        
				.duration(200)      
				.style("opacity", .8);

				var contentHtml = d.sector + ' <br>';
				contentHtml += d.totalRoutes + ' routes - ';
				contentHtml += d.avgRating.toFixed(1) + ' <i class="fa fa-star-o"></i>'; 
				div.html(contentHtml)  
					.style("left", (event.pageX) + "px")     
					.style("top", (event.pageY-40)  + "px");    
			})                  
		.on("mouseout", function(d) {       
			div.transition()        
			.duration(500)      
			.style("opacity", 0);   
		});

		focus.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + heightChart + ")")
			.call(xAxisFocus);

		focus.append("g")
			.attr("class", "y axis")
			.call(yAxisFocus)
			.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", 6)
			.attr("dy", ".71em")
			.style("text-anchor", "end")
			.text("Average Rating");

		focus.append("g")
			.attr("class", "x axis")
			.attr("transform", "translate(0," + heightChart + ")")
			.call(xAxisFocus)
			.append("text")
			.attr("x", widthChart)
			.attr("y", "-6")
			.style("text-anchor", "end")
			.text("Total Routes");

		svg.selectAll('.axis line, .axis path').style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px','shape-rendering':'crispEdges'});

	}


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
