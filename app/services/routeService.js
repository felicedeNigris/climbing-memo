app.factory('routeService', function routeService($firebase,FIREBASE_URL,$http) {

	var _ref = new Firebase(FIREBASE_URL);
	var routeService = {};

	/**
	 * Get routes as Object from firebase
	 *
	 * @method getRoutes
	 * @return {Object} Firebase object
	 */
	routeService.getRoutes = function () {
		return $firebase(_ref.child('routes')).$asObject();
	};

	/**
	 * Tell if a firebase object is a route
	 *
	 * @method isObject
	 * @param {Object} Firebase object
	 * @return {Boolean} True if is a route
	 */
	routeService.isObject = function (object) {
		return typeof object === 'object' && object && object.hasOwnProperty('id');
	};

	/**
	 * Convert Firebase object to an array of routes
	 * 
	 * @method objectToArray
	 * @param {Object} Firebase object
	 * @return {Array} Array of routes
	 */
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

