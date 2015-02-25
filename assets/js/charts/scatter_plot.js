function drawScatterPlot(data) {

	var margin_focus = {top: 20, right: 25, bottom: 30, left: 50},
	width      = $("#panel-chart").width() - margin_focus.left - margin_focus.right,
	height     = 300 - margin_focus.top - margin_focus.bottom,
	selected_x = "routes",
	selected_y = "grade";

	var x_focus = d3.scale.linear().range([0, width]),
	y_focus = d3.scale.linear().range([height, 0]);

	var x_axis_focus = d3.svg.axis().scale(x_focus).orient("bottom"),
	y_axis_focus = d3.svg.axis().scale(y_focus).orient("left");

	var focus;

	//REMOVE SVG
	$("#panel-chart").empty();

	// CREATE NEW SVG
	var svg = d3.select("#panel-chart").append("svg")
		.attr("width", width + margin_focus.left + margin_focus.right)
		.attr("height", height + margin_focus.top + margin_focus.bottom);

	focus = svg.append("g")
		.attr("transform", "translate(" + margin_focus.left + "," + margin_focus.top + ")");

	// CREATE CHART DATA
	var chart_data = new Array();
	for (var i = 0 ; i < data.length ; i++)
	{
		var object = data[i];
		object[selected_x] = parseNumber(object[selected_x]);
		object[selected_y] = parseNumber(object[selected_y]);

		if (object[selected_x] > 0 && object[selected_y] > 0)
			chart_data.push(object);
	}

	// CREATE DOMAIN
	x_focus.domain([
		d3.min(chart_data, function(d) { return d[selected_x] }),
		d3.max(chart_data, function(d) { return d[selected_x] })
	]);
	y_focus.domain([
		d3.min(chart_data, function(d) { return d[selected_y] }),
		d3.max(chart_data, function(d) { return d[selected_y] })
	]);

	// TOOLTIP DIV
	var div = d3.select("body").append("div")   
		.attr("class", "tooltip")               
		.style("opacity", 0);

	// DOTS
	focus.selectAll(".dot")
		.data(chart_data)
		.enter()
		.append("circle")
		.attr("class", "dot-usage")
		.attr("r", 5)       
		.attr("cx", function(d) { return x_focus(d[selected_x]) } )
		.attr("cy", function(d) { return y_focus(d[selected_y]) } )
		.style("fill", "lightskyblue")
		.on("mouseover", function(d) {      
			div.style("background", "skyblue");
			div.transition()        
			.duration(200)      
			.style("opacity", .8);

		div.html(d.name)  
			.style("left", (event.pageX) + "px")     
			.style("top", (event.pageY-18)  + "px");    
		})                  
	.on("mouseout", function(d) {       
		div.transition()        
		.duration(500)      
		.style("opacity", 0);   
	});

	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(x_axis_focus);

	focus.append("g")
		.attr("class", "y axis")
		.call(y_axis_focus)
		.append("text")
		.attr("transform", "rotate(-90)")
		.attr("y", 6)
		.attr("dy", ".71em")
		.style("text-anchor", "end");

	focus.append("g")
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(x_axis_focus)
		.append("text")
		.attr("x", width)
		.attr("y", "-6")
		.style("text-anchor", "end");

	svg.selectAll('.axis line, .axis path').style({'stroke': 'Black', 'fill': 'none', 'stroke-width': '1px','shape-rendering':'crispEdges'});

	function parseNumber(string) {
		if (!string || string.length == 0)
			return 0;
		return parseFloat(string.replace(",",""));
	}
}
