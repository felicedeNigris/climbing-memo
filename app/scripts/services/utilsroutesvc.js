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

  var cachedRoutes = null
  var intervalDelay = 60000 // 1 minute
  var canCreateTimeout = true

  /**
  * Sync routes to database if needed
  *
  * @method syncRoutes
  */
  this.syncRoutes = function() {
    if ($rootScope.online) { // Try to sync
      _.each($localStorage.routes, function(route){
        switch (route.$sync) {
          case 'create':
          case 'update':
            this.saveRoute(route)
            break
          case 'delete':
            this.deleteRoute(route)
            break
        }
      })
      canCreateTimeout = true
    } else {
      this.createTimeout()
    }
  }

  this.createTimeout = function () {
    if (canCreateTimeout) {
      canCreateTimeout = false
      $timeout(syncRoutes, myIntervalDelay)
      myIntervalDelay *= 2
    }
  }

  /**
  * Get routes - from firebase or localStorage
  *
  * @method getRoutes
  * @return {Object} - Promise
  */
  this.getRoutes = function() {
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
        // TODO Check if "sync" field exist and sync if needed
        if (_.filter(cachedRoutes, function(cachedRoute) {
          return cachedRoute.$sync
        }).length > 0) {
          this.syncRoutes()
        }
      })
      .catch(function() { // Use LocalStorage
        $log.log('Local Storage used - routes')
        cachedRoutes = $localStorage.routes
        deferred.resolve(data)
        deferred.resolve($localStorage.routes || [])

        // TODO Check if "sync" field exist create sync timer every X minutes
        if (_.filter(cachedRoutes, function(cachedRoute) {
          return cachedRoute.$sync
        }).length > 0) {
          this.createTimeout()
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
  * @return {Object} promise - resolve as id or false
  */
  this.saveRoute = function(sourceRoute) {
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
          notificationService.error('Error while saving ' + route.name)
          // TODO save localStorage and add "need sync" field
          // TODO create unique timer to sync every X minutes
          var localStorageRoute = _.filter($localStorage.routes, function(localRoute) {
            return route.id === localRoute
          })
          if (localStorageRoute) {
            localStorageRoute.$sync = 'update'
            this.createTimeout()
          }
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
          notificationService.error('Error while saving ' + route.name)
          // TODO save localStorage and add "need sync" field
          // TODO create unique timer to sync every X minutes
          route.$sync = 'create'
          $localStorage.routes.push(route)
          this.createTimeout()
        })
      }
    })
    .catch(function() {
      deferred.reject(false)
      // TODO save localStorage and add "need sync" field
      // TODO create unique timer to sync every X minutes
      if (route.id) { // Update route
        var localStorageRoute = _.filter($localStorage.routes, function(localRoute) {
          return route.id === localRoute
        })
        if (localStorageRoute) {
          localStorageRoute.$sync = 'update'
          this.createTimeout()
        }
      } else { // Create new route
        route.$sync = 'create'
        $localStorage.routes.push(route)
        this.createTimeout()
      }
    })

    return deferred.promise
  }

  /**
  * Delete a route
  * @method deleteRoute
  * @param {Object} route
  * @return {Object} promise - route id or false
  */
  this.deleteRoute = function(route) {
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
      notificationService.error('Error while deleting ' + route.name)

      // TODO save localStorage and add "need sync" field
      var localStorageRoute = _.filter($localStorage.routes, function(localRoute) {
        return route.id === localRoute
      })
      if (localStorageRoute) {
        localStorageRoute.$sync = 'delete'
        this.createTimeout()
      }

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
  this.getIconStatus = function(route) {
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
  this.getIconRock = function(route) {
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
  this.getIndoorLabel = function(route) {
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
  this.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route ? route.type : '')
  }
})
