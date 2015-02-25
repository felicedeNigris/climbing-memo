function drawGoogleMap (data) {

	var map = new google.maps.Map(document.getElementById('panel-map'),{} );
	var bounds = new google.maps.LatLngBounds();

	for (var key in data)
	{
		var site = data[key];

		// Test valid site to display
		if (typeof site !== 'object' ||	!site ||
			!site.hasOwnProperty('name') ||
			!site.hasOwnProperty('latitude') ||
			!site.hasOwnProperty('longitude'))
			continue;

		var contentString = '<div style="white-space:nowrap">'+
			'<b>'+site.location+'</b></div>';

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

