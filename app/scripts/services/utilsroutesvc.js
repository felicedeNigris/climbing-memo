'use strict'

/**
* @ngdoc service
* @name climbingMemo.utilsRouteSvc
* @description
* # utilsRouteSvc
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('utilsRouteSvc', function($filter, notificationService, $rootScope,
routesSvc, $http, $q, utilsChartSvc, $localStorage, $log, $timeout) {

  var utilsRouteSvc = this

  var cachedRoutes = null
  var intervalDelay = 60000 // 1 minute
  var canCreateTimeout = true

  /**
  * Create route sync property in localStorage
  *
  * @method createRouteSync
  * @param {String} event
  * @param {Object} route
  */
  utilsRouteSvc.createRouteSync = function(event, route) {
    // TODO watch for $rootScope event (online)
    var localRouteFound = false

    $localStorage.routes = _.map($localStorage.routes, function(localRoute) {
      if (route.id === localRoute.id) { // Update route
        localRouteFound = true
        localRoute.$sync = event
        utilsRouteSvc.createTimeout()
      }
      return localRoute
    })
    if (!localRouteFound && event != 'delete') { // Create route
      route.$sync = event
      // var objectKey = "tmp_" + _.random(10000, 99999)
      // $localStorage.routes[objectKey] = route
      $localStorage.routes.push(route)
      utilsRouteSvc.createTimeout()
    }
  }

  /**
  * Sync routes to database if needed
  *
  * @method syncRoutes
  */
  utilsRouteSvc.syncRoutes = function() {
    if ($rootScope.online) { // Try to sync
      canCreateTimeout = true
      _.each($localStorage.routes, function(route) {
        switch (route.$sync) {
          case 'create':
          case 'update':
            utilsRouteSvc.saveRoute(route, true).then(function(routeId) {
              intervalDelay = 60000 // 1 minute
              delete route.$sync
              $rootScope.$broadcast('routesUpdated', routeId)
            })
            break
          case 'delete':
            utilsRouteSvc.deleteRoute(route, true).then(function(routeId) {
              intervalDelay = 60000 // 1 minute
              delete route.$sync
              $rootScope.$broadcast('routesUpdated', routeId)
            })
            break
        }
      })
    } else {
      utilsRouteSvc.createTimeout()
    }
  }

  utilsRouteSvc.createTimeout = function() {
    if (canCreateTimeout) {
      canCreateTimeout = false
      $timeout(utilsRouteSvc.syncRoutes, intervalDelay)
      intervalDelay *= 2
    }
  }

  /**
  * Get routes - from firebase or localStorage
  *
  * @method getRoutes
  * @return {Object} - Promise
  */
  utilsRouteSvc.getRoutes = function() {
    var deferred = $q.defer()

    if (cachedRoutes) { // Use Cache
      deferred.resolve(cachedRoutes)
    } else { // Query network
      routesSvc.getRoutes().then(function(result) {
        var data = result.data
        data = data || {}
        $localStorage.routes = data
        cachedRoutes = data
        deferred.resolve(data)

        if (_.find(cachedRoutes, function(cachedRoute) {
          return angular.isDefined(cachedRoute.$sync)
        })) {
          utilsRouteSvc.syncRoutes()
        }
      })
      .catch(function() { // Use LocalStorage
        $log.log('Local Storage used - routes')
        cachedRoutes = $localStorage.routes
        deferred.resolve($localStorage.routes || [])

        if (_.find(cachedRoutes, function(cachedRoute) {
          return angular.isDefined(cachedRoute.$sync)
        })) {
          utilsRouteSvc.createTimeout()
        }
      })
    }

    return deferred.promise
  }

  /**
  * Save route - it will calculate the lat long
  *
  * @method saveRoute
  * @param {Object} route
  * @param {Boolean} silentWhenError
  * @return {Object} promise - resolve as id or false
  */
  utilsRouteSvc.saveRoute = function(sourceRoute, silentWhenError) {
    var deferred = $q.defer()

    var route = JSON.parse(JSON.stringify(sourceRoute)) // Clone
    route.date = $filter('date')(route.$date,'MM/dd/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location))
    .then(function(result) {
      var data = result.data
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }

      if (route.id) { // Update route
        routesSvc.updateRoute(route, route.id)
        .then(function() {
          cachedRoutes = cachedRoutes || {}
          cachedRoutes[route.id] = routesSvc.cleanObjectProperties(route)
          notificationService.success(route.name + ' saved')
          deferred.resolve(route.id)
        })
        .catch(function() {
          deferred.reject(false)
          silentWhenError || notificationService.info('Offline mode: "update" event saved')
          utilsRouteSvc.createRouteSync('update', route)
        })
      } else { // Create new route
        routesSvc.addRoute(route)
        .then(function(result) {
          notificationService.success(route.name + ' saved')
          route.id = result.data.name
          routesSvc.updateRoute(route, route.id)

          if (angular.isDefined(route.$copy)) {
            sourceRoute = route.$copy // Revert source route
            cachedRoutes[sourceRoute.id] = routesSvc.cleanObjectProperties(sourceRoute)
          }

          cachedRoutes = cachedRoutes || {}
          cachedRoutes[route.id] = routesSvc.cleanObjectProperties(route)
          deferred.resolve(route.id)
        })
        .catch(function() {
          deferred.reject(false)
          silentWhenError || notificationService.info('Offline mode: "create" event saved')
          utilsRouteSvc.createRouteSync('create', route)
        })
      }
    })
    .catch(function() {
      deferred.reject(false)
      var routeEvent = route.id ? 'update' : 'create'
      silentWhenError || notificationService.info('Offline mode: "' + routeEvent + '" event saved')
      utilsRouteSvc.createRouteSync(routeEvent, route)
    })

    return deferred.promise
  }

  /**
  * Delete a route
  * @method deleteRoute
  * @param {Object} route
  * @param {Boolean} silentWhenError
  * @return {Object} promise - route id or false
  */
  utilsRouteSvc.deleteRoute = function(route, silentWhenError) {
    var deferred = $q.defer()

    routesSvc.deleteRoute(route.id)
    .then(function() {
      notificationService.success(route.name + ' deleted')
      if (cachedRoutes) { // Update Cache
        delete cachedRoutes[route.id]
      }
      deferred.resolve(route.id)
    })
    .catch(function() {
      deferred.reject(false)
      silentWhenError || notificationService.info('Offline mode: "delete" event saved')
      utilsRouteSvc.createRouteSync('delete', route)
    })

    return deferred.promise
  }

  //  ____             _                 _   _ _   _ _
  // |  _ \ ___  _   _| |_ ___          | | | | |_(_) |___
  // | |_) / _ \| | | | __/ _ \  _____  | | | | __| | / __|
  // |  _ < (_) | |_| | ||  __/ |_____| | |_| | |_| | \__ \
  // |_| \_\___/ \__,_|\__\___|          \___/ \__|_|_|___/

  /**
  * Get icon based on route status
  *
  * @method getIconStatus
  * @param {Object} route
  * @return {String}
  */
  utilsRouteSvc.getIconStatus = function(route) {
    if (!(route && route.status)) {
      return 'fa-connectdevelop'
    }
    return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
  }

  /**
  * Get icon based on route rock
  *
  * @method getIconRock
  * @param {Object} route
  * @return {String}
  */
  utilsRouteSvc.getIconRock = function(route) {
    if (!(route && route.rock)) {
      return 'fa-connectdevelop'
    }
    return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
  }

  /**
  * Get Indoor label based on route rock
  *
  * @method getIndoorLabel
  * @param {Object} route
  * @return {String}
  */
  utilsRouteSvc.getIndoorLabel = function(route) {
    return route.rock === 'Indoor' ? 'Indoor' : 'Outdoor'
  }

  /**
  * Get route color based on type
  *
  * @method getTypeColor
  * @param {Object} Route
  *
  * @return {String} Css color
  */
  utilsRouteSvc.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route ? route.type : '')
  }

  return utilsRouteSvc
})
