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
notificationService, $http, $filter, $rootScope, $log) {

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
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
  * Save route It will calculate the lat long
  *
  * @method saveRoute
  */
  $scope.saveRoute = function() {
    var route = $scope.route
    route.date = $filter('date')(route.$date,'MM/dd/yyyy')

    var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address='

    $http.get(baseUrl + encodeURIComponent(route.location)).success(function(data) {
      if (data.status !== 'ZERO_RESULTS') {
        route.latitude = data.results[0].geometry.location.lat
        route.longitude = data.results[0].geometry.location.lng
      }


      routesSvc.addRoute(route)
      .success(function(data) {
        notificationService.success(route.name + ' saved')
        route.$id = data.name
        routes[route.$id] = route
        $rootScope.$broadcast('routesUpdated', routes)
      })
      .error(function() {
        notificationService.error('Error while saving ' + route.name)
      })
    })
  }

  var routes = {}
  $scope.initController = function(data) {
    routes = data
    var route = {}
    route.notes = routeNoteFormattingFilter()
    route.date = new Date()
    route.status = 'Attempt'

    // FIXME Use $rootScope instead of local storage
    var arrayRoutes    = _.toArray($localStorage.routes)
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
})
