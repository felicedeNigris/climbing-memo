function getMapChart () {

	var rawData = [];

	function my(container) {

		var map = new google.maps.Map(document.getElementById(container),{} );
		var bounds = new google.maps.LatLngBounds();

		// Process data
		var data = getMapChartData(rawData);

		for (var i=0 ; i < data.length ; i++) {
			var site = data[i];

			var contentString = '<div style="white-space:nowrap">';
			contentString += '<b>'+site.name+'</b><br>';

			// List of climbing types
			if (site.metrics.length > 0) {
				contentString += '<ul class="list-unstyled">';

				for (var j=0 ; j < site.metrics.length ; j++)
					contentString += '<li>'+site.metrics[j].type+': '+site.metrics[j].count+'</li>';

				contentString += '</ul>';
			}

			contentString += '</div>';

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(site.latitude,site.longitude),
				   map: map,
				   title: site.name,
				   infowindow: new google.maps.InfoWindow({content: contentString}),
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

