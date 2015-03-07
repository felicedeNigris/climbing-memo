function getHorizontalBar(data) {

	var data = [];
	var width = 800;
	var height = 600;

	function my (container) {

		//REMOVE SVG
		container.select("svg").remove();

		// CREATE NEW SVG
		var svg = container.append("svg")
			.attr("width", width)
			.attr("height", height);

		// CREATE CHART DATA

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
