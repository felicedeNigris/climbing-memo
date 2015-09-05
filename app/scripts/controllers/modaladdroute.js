'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:ModaladdrouteCtrl
* @description
* # ModaladdrouteCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('ModaladdrouteCtrl', function($modalInstance, $scope,
routeNoteFormattingFilter, $localStorage, utilsChartSvc, routesSvc,
utilsRouteSvc, $rootScope, $log) {

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.cancelEdit = function() {
    $modalInstance.dismiss('cancel')
  }

  /**
  * Flip the active slide
  *
  * @method flipCard
  */
  $scope.flipCard = function() {
    $scope.route.$hover = !$scope.route.$hover
  }

  /**
  * Populate smart default values when a sector is selected
  *
  * @method sectorPopulatePlaceholder
  */
  $scope.sectorPopulatePlaceholder = function() {

    var arrayRoutes = _.toArray($localStorage.routes).filter(function(n) {
      return n.sector === $scope.route.sector
    })

    var properties = ['type','rock','location']

    for (var i=0 ; i < properties.length ; i++) {
      var property = properties[i]
      if (!$scope.route.hasOwnProperty(property)) {
        $scope.route[property] = utilsChartSvc.arrayGroupBy(arrayRoutes,property)[0]
      }
    }
  }

  /**
  * Save route - it will calculate the lat long
  *
  * @method saveRoute
  */
  $scope.saveRoute = function() {
    utilsRouteSvc.saveRoute($scope.route, routes)
    $scope.cancelEdit()
  }

  var routes = {}
  $scope.initController = function(data) {
    routes = data
    var route = {}
    route.notes = routeNoteFormattingFilter()
    route.$date = new Date()
    route.status = 'Attempt'

    var arrayRoutes    = _.toArray(routes)
    $scope.locations = utilsChartSvc.arrayGroupBy(arrayRoutes,"location")
    $scope.sectors = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")

    $scope.route = route
  }

  // Get Data
  routesSvc.getRoutes().then(function(result) {
    var data = result.data || {}
    $localStorage.routes = data
    $scope.initController(data)
  })
  .catch(function() {
    $log.log('Local Storage used - routes')
    $scope.initController($localStorage.routes || [])
  })

  //  ____             _                 _   _ _   _ _
  // |  _ \ ___  _   _| |_ ___          | | | | |_(_) |___
  // | |_) / _ \| | | | __/ _ \  _____  | | | | __| | / __|
  // |  _ < (_) | |_| | ||  __/ |_____| | |_| | |_| | \__ \
  // |_| \_\___/ \__,_|\__\___|          \___/ \__|_|_|___/
  //
  // TODO - Abstrat in it's own service

  /**
  * get icon based on route status
  *
  * @method geticonstatus
  * @param {object} route
  * @return {string}
  */
  $scope.getIconStatus = function(route) {
    if (!(route && route.status)) {
      return 'fa-connectdevelop'
    }
    return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
  }

  /**
  * get icon based on route rock
  *
  * @method geticonrock
  * @param {object} route
  * @return {string}
  */
  $scope.getIconRock = function(route) {
    if (!(route && route.rock)) {
      return 'fa-connectdevelop'
    }
    return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
  }

  /**
  * get indoor label based on route rock
  *
  * @method getindoorlabel
  * @param {object} route
  * @return {string}
  */
  $scope.getIndoorLabel = function(route) {
    return route.rock === 'Indoor' ? 'indoor' : 'outdoor'
  }

  /**
  * get route color based on type
  *
  * @method gettypecolor
  * @param {object} route
  *
  * @return {string} css color
  */
  $scope.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route ? route.type : '')
  }
})
