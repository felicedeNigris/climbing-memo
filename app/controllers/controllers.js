
app.controller ('MainController', function ($scope) {
	$scope.$on('$viewContentLoaded', function(){
		$.material.init();
	});
});

app.controller ('GeneralController', function ($scope,routeService,$http) {

	// Get Data
	routeService.getRoutes().$bindTo($scope,"routes").then(function () {
		initController()

		for (var key in $scope.routes)
			if (isRoute($scope.routes[key]))
				$scope.routes[key].$visible = true;

	});

	// Init Controller
	var initController = function () {
		drawGoogleMap($scope.routes);

		$scope.locations = groupBy($scope.routes,"location");
		$scope.sectors = groupBy($scope.routes,"sector");
		$scope.setters = groupBy($scope.routes,"setter");
	};

	// Controller methods
	$scope.addRoute = function () {
		var id = Date.now();
		$scope.routes[id] = {
			'$edit':true,
			'$visible':true,
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
			}
			initController();
		});

	};

	$scope.deleteRoute = function (route) {
		if ($scope.routes[route.id] != undefined)
		{
			delete $scope.routes[route.id];
			initController();
		}
	};
});
