

app.controller ('GeneralController', function ($scope,routeService) {
	var dropZone = document.getElementById("drop-zone");
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
	routeService.getRoutes().$bindTo($scope,"routes");

	$scope.addRoute = function () {
		var id = Date.now();
		$scope.routes[id] = {
			'$edit':true,
			'id': id
		};
	};
	
	$scope.deleteRoute = function (route) {
		if ($scope.routes[route.id] != undefined)
			delete $scope.routes[route.id];
	};
});
