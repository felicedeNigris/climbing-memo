'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:ModalsliderCtrl
* @description
* # ModalsliderCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('ModalsliderCtrl', function($scope, $modalInstance, routesId,
$localStorage, routesSvc, $log, routeNoteFormattingFilter, utilsChartSvc,
utilsRouteSvc, $filter, $rootScope) {

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
    $modalInstance.dismiss('cancel')
  }

  var routes = {}
  routesSvc.getRoutes().then(function(result) {
    routes = result.data || {}
    $localStorage.routes = routes
    $scope.initController(routes)
  })
  .catch(function() {
    $log.log('Local Storage used - routes')
    $scope.initController($localStorage.routes || [])
  })

  /**
  * Create slider based on routesId
  *
  * @method initController
  * @param {Array} routes
  */
  $scope.initController = function(routes) {
    var displayedRoutes = _.map(routesId, function(id) {
      return _.find(routes, function(route) {
        return route.id === id
      })
    })

    $scope.myInterval = 0
    $scope.noWrapSlides = false
    $scope.slides = _.map(displayedRoutes, function(route) {
      route.notes = routeNoteFormattingFilter(route.notes)
      return {
        content: route
      }
    })
  }

  $scope.editRoute = function(route) {
    route.$date = new Date(route.date)
    route.$editMode = true
  }

  $scope.deleteRoute = function(route) {
    route.$editMode = false
    utilsRouteSvc.deleteRoute(route)
    .then(function(routeId) {
      delete routes[routeId]
      $rootScope.$broadcast('routesUpdated', routes)
    })

    $scope.closeModal()
  }

  $scope.copyRoute = function(route) {
    route.$copy = JSON.parse(JSON.stringify(route)) // Clone
    route.id = false // Will create new route
    $scope.editRoute(route)
  }

  $scope.saveRoute = function(route) {
    route.$editMode = false

    utilsRouteSvc.saveRoute(route)
    .then(function(routeId) {
      if (angular.isDefined(route.$copy)) {
        var tmp = route.$copy
        delete route.$copy
        route.id = routeId
        routes[routeId] = JSON.parse(JSON.stringify(route)) // New route
        routes[tmp.id] = tmp // Model route
      } else {
        routes[route.id] = route
      }
      $rootScope.$broadcast('routesUpdated', routes)
    })

    $scope.closeModal()
  }

  $scope.cancelEdit = function(route) {
    route.$editMode = false
    $scope.closeModal()
  }

  /**
  * Create an array of size N
  *
  * @method getTimes
  * @param {Integer} n
  * @return {Array}
  */
  $scope.getTimes = function(n) {
    return new Array(n)
  }

  /**
  * Flip the active slide
  *
  * @method flipCard
  */
  $scope.flipCard = function() {
    var activeSlide = _.first($scope.slides.filter(function(slide) {
      return slide.active
    }))
    activeSlide.$hover = !activeSlide.$hover
  }

  //  ____             _                 _   _ _   _ _
  // |  _ \ ___  _   _| |_ ___          | | | | |_(_) |___
  // | |_) / _ \| | | | __/ _ \  _____  | | | | __| | / __|
  // |  _ < (_) | |_| | ||  __/ |_____| | |_| | |_| | \__ \
  // |_| \_\___/ \__,_|\__\___|          \___/ \__|_|_|___/
  //
  // TODO - Abstrat in it's own service

  /**
  * Get icon based on route status
  *
  * @method getIconStatus
  * @param {Object} route
  * @return {String}
  */
  $scope.getIconStatus = function(route) {
    return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
  }

  /**
  * Get icon based on route rock
  *
  * @method getIconRock
  * @param {Object} route
  * @return {String}
  */
  $scope.getIconRock = function(route) {
    return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
  }

  /**
  * Get Indoor label based on route rock
  *
  * @method getIndoorLabel
  * @param {Object} route
  * @return {String}
  */
  $scope.getIndoorLabel = function(route) {
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
  $scope.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route.type)
  }
})
