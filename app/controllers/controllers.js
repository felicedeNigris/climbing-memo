

app.controller ('GeneralController', function ($scope,routeService,ngTableParams,$http) {

	// Get Data
	routeService.getRoutes().$bindTo($scope,"routes").then(function () {
		initController()
	});


	// Init Controller
	var initController = function () {
		drawGoogleMap($scope.routes);

		$scope.locations = groupBy($scope.routes,"location");
		$scope.sectors = groupBy($scope.routes,"sector");
		$scope.setters = groupBy($scope.routes,"setter");
	};

	// Util function
	var groupBy = function (object,field) {
		var seen = {};
		return Object.keys(object).map ( function (group) {
			if (typeof object[group] === 'object' &&
				object[group] &&
				object[group].hasOwnProperty(field))
				return object[group][field];
		}).filter(function(n) { 
			return seen.hasOwnProperty(n) || n === undefined ? false : (seen[n] = true)
		});
	};

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
