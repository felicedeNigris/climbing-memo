app.factory('routeService', ["$firebase", function myService($firebase) {

	var _ref = new Firebase('https://INSTANCE.firebaseio.com');
	var routeService = {};

	routeService.getRoutes = function () {
		return $firebase(_ref.child('routes')).$asArray();
	};

	return routeService;

}]);

