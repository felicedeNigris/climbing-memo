
/**
 * Create and return a Google Map  chart
 *
 * @return {Function} Callable object to create map
 */
function getMapChart () {

	var rawData = [];

	function my(container) {

		var map = new google.maps.Map(document.getElementById(container),{} );
		var bounds = new google.maps.LatLngBounds();

		// Process data
		var data = getMapChartData(rawData);

		for (var i=0 ; i < data.length ; i++) {
			var site = data[i];

			// Set content html

			var contentString = '<div style="white-space:nowrap">';
			contentString += '<b>'+site.name+'</b><br>';
			contentString += '<ul class="list-unstyled" style="margin-bottom:0px">';

			for (var j=0 ; j < site.metrics.length ; j++)
				contentString += '<li>'+site.metrics[j].type+': '+site.metrics[j].count+'</li>';

			contentString += '</ul>';
			contentString += '</div>';

			// Set marker icon
			var markerIcon = "climbing_gray.png";
			switch (site.metrics[0].type) {
				case 'Sport lead':	markerIcon = "climbing_yellow.png"; break;
				case 'Boulder':		markerIcon = "climbing_blue.png"; break;
				case 'Traditional':	markerIcon = "climbing_green.png"; break;
				case 'Multi-pitch':	markerIcon = "climbing_orange.png"; break;
				case 'Top rope':	markerIcon = "climbing_gray.png"; break;
			}

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(site.latitude,site.longitude),
				map: map,
				icon: 'assets/img/'+markerIcon,
				title: site.name,
				infowindow: new google.maps.InfoWindow({
					content: contentString
				}),
			});

			bounds.extend(marker.position);

			google.maps.event.addListener(marker, 'click', function() {
				this.infowindow.open(map,this);
			});

			google.maps.event.trigger(map, 'resize');
			map.fitBounds(bounds);
		}

	}

	my.data = function (value) {
		if (!arguments.length) return rawData;
		rawData = value;
		return my;
	};

	return my;
}

