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
routeNoteFormattingFilter, utilsChartSvc, utilsRouteSvc, $rootScope, $log) {
  // Buffer for all routes
  $scope.arrayRoutes = []

  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  // Watch Update event
  $rootScope.$on('routesUpdated', function() {
    utilsRouteSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })
  })

  /**
  * Close the modal
  *
  * @method cancelEdit
  */
  $scope.cancelEdit = function() {
    $modalInstance.dismiss('cancel')
  }

  /**
  * Flip the card by simulating mouse hover
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

    var filteredArrayRoutes = $scope.arrayRoutes.filter(function(n) {
      return n.sector === $scope.route.sector
    })

    var properties = ['type','rock','location']

    for (var i=0 ; i < properties.length ; i++) {
      var property = properties[i]
      if (!$scope.route.hasOwnProperty(property)) {
        $scope.route[property] = utilsChartSvc.arrayGroupBy(filteredArrayRoutes,property)[0]
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
      $rootScope.$broadcast('routesUpdated', routeId)
    }).catch(function(routeId) {
      $rootScope.$broadcast('routesUpdated', routeId)
    })

    $scope.cancelEdit()
  }

  $scope.initController = function(data) {
    var route = {}
    route.notes = routeNoteFormattingFilter()
    route.$date = new Date()
    route.status = 'Attempt'

    $scope.arrayRoutes    = _.toArray(data)
    $scope.locations = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"location")
    $scope.sectors = utilsChartSvc.arrayGroupBy($scope.arrayRoutes,"sector")

    $scope.route = route
  }

  $scope.getIconStatus  = function(route) { return utilsRouteSvc.getIconStatus(route) }
  $scope.getIconRock    = function(route) { return utilsRouteSvc.getIconRock(route) }
  $scope.getIndoorLabel = function(route) { return utilsRouteSvc.getIndoorLabel(route) }
  $scope.getTypeColor   = function(route) { return utilsRouteSvc.getTypeColor(route) }
})
