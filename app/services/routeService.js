app.factory('routeService', function routeService($firebase,FIREBASE_URL,$http) {

	var _ref = new Firebase(FIREBASE_URL);
	var routeService = {};

	routeService.getRoutes = function () {
		return $firebase(_ref.child('routes')).$asObject();
	};


	return routeService;

});

