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
    utilsRouteSvc.saveRoute($scope.route)
    .then(function(routeId) {
      routes[routeId] = $scope.route
      $rootScope.$broadcast('routesUpdated', routes)
    })

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
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  $scope.getIconStatus  = function(route) { return utilsRouteSvc.getIconStatus(route) }
  $scope.getIconRock    = function(route) { return utilsRouteSvc.getIconRock(route) }
  $scope.getIndoorLabel = function(route) { return utilsRouteSvc.getIndoorLabel(route) }
  $scope.getTypeColor   = function(route) { return utilsRouteSvc.getTypeColor(route) }
})
