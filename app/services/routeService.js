'use strict'

angular.module('climbingMemo')
.factory('routeService', function routeService($firebaseObject,FIREBASE_URL,$http) {

	var _ref = new Firebase(FIREBASE_URL)
	var routeServiceFactory = {}

	/**
	 * Get routes as Object from firebase
	 *
	 * @method getRoutes
	 * @return {Object} Firebase object
	 */
	routeServiceFactory.getRoutes = function() {
		return $firebaseObject(_ref.child('routes'))
	}

	/**
	 * Tell if a firebase object is a route
	 *
	 * @method isObject
	 * @param {Object} Firebase object
	 * @return {Boolean} True if is a route
	 */
	routeServiceFactory.isObject = function(object) {
		return typeof object === 'object' && object && object.hasOwnProperty('id')
	}

	/**
	 * Convert Firebase object to an array of routes
	 *
	 * @method objectToArray
	 * @param {Object} Firebase object
	 * @return {Array} Array of routes
	 */
	routeServiceFactory.objectToArray = function(object) {
		var routes = []
		for (var key in object) {
			if (routeServiceFactory.isObject(object[key]))
				routes.push(object[key])
		}
		return routes
	}


	return routeServiceFactory

})

