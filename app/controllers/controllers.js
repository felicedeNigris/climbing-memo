
app.controller ('MainController', function ($scope) {
	$scope.$on('$viewContentLoaded', function(){
	});
});

app.controller ('GeneralController', function ($scope,$filter,routeService,$http) {

	// Get Data
	routeService.getRoutes().$bindTo($scope,"routes").then(function () {
		initController()

		for (var key in $scope.routes)
			if (routeService.isObject($scope.routes[key]))
				$scope.routes[key].$visible = true;

	});

	// Init Controller
	var initController = function () {

		var arrayRoutes = routeService.objectToArray($scope.routes);

		drawMapChart({ data:arrayRoutes, containerId:'panel-map'});
		drawCalendarHeatmap({ data:arrayRoutes, containerSelector:'#panel-calendar-heatmap'});
		
		var arrayLocations = arrayGroupBy(arrayRoutes,"location");
		var arraySectors = arrayGroupBy(arrayRoutes,"sector");
		var arraySetters = arrayGroupBy(arrayRoutes,"setter");
		var arrayClimbs = arrayGroupBy(arrayRoutes,"climb");

		$scope.locations = arrayLocations;
		$scope.sectors = arraySectors;
		$scope.setters = arraySetters;
		$scope.metrics = {
			count: arrayRoutes.length,
			favoriteSector: arraySectors[0],
			favoriteClimb: arrayClimbs[0],
		};

	};

	// Controller methods
	$scope.addRoute = function () {
		var id = Date.now();

		// Set default values
		$scope.routes[id] = {
			'$edit':true,
			'$visible':true,
			'date':$filter('date')(id,'dd/MM/yyyy'),
			'climb':'Top rope',
			'status':'Attempt',
			'rock':'Indoor',
			'id': id
		};


	};

	$scope.openDatepicker = function($event,route) {
		$event.preventDefault();
		$event.stopPropagation();

		$scope.routes[route.id].$datepicker = !route.$datepicker;
	};

	$scope.updatedRoute = function (route) {
		
		route.$edit = false;
		route.date = $filter('date')(route.date,'dd/MM/yyyy'); // Save to Firebase

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
