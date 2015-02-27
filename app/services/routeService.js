app.factory('routeService', function routeService($firebase,FIREBASE_URL,$http) {

	var _ref = new Firebase(FIREBASE_URL);
	var routeService = {};

	routeService.getRoutes = function () {
		return $firebase(_ref.child('routes')).$asObject();
	};


	routeService.isObject = function (object) {
		return typeof object === 'object' && object && object.hasOwnProperty('id');
	};

	routeService.objectToArray = function (object) {
		var routes = [];
		for (var key in object){
			if (routeService.isObject(object[key]))
				routes.push(object[key]);
		}
		return routes;
	};


	return routeService;

});

