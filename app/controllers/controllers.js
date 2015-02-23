

app.controller ('GeneralController', function ($scope,routeService,ngTableParams,$http) {

	// Init Controller
	routeService.getRoutes().$bindTo($scope,"routes").then(function(){
		drawGoogleMap($scope.routes);
	});

	// Controller methods
	$scope.addRoute = function () {
		var id = Date.now();
		$scope.routes[id] = {
			'$edit':true,
			'id': id
		};
	};
	
	$scope.updatedRoute = function (route) {
		route.$edit = false;

		var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=';
		$http.get(baseUrl+ encodeURIComponent(route.location)).success(function (data) {
			if (data.status !== 'ZERO_RESULTS') {
				route.latitude = data.results[0].geometry.location.lat;
				route.longitude = data.results[0].geometry.location.lng;
				drawGoogleMap($scope.routes);
			}
		});
	};

	$scope.deleteRoute = function (route) {
		if ($scope.routes[route.id] != undefined)
			delete $scope.routes[route.id];
	};
});
