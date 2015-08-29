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
$localStorage, routesSvc, $log, routeNoteFormattingFilter) {

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
    $modalInstance.dismiss('cancel')
  }

  routesSvc.getRoutes().then(function(result) {
    var data = result.data || {}
    $localStorage.routes = data
    $scope.initController(data)
  })
  .catch(function() {
    $log.log('Local Storage used - routes')
    $scope.initController($localStorage.routes || [])
  })

  $scope.initController = function(routes) {

    var displayedRoutes = _.filter(routes, function(route) {
      return _.indexOf(routesId, route.id) !== -1
    })

    $scope.myInterval = 5000
    $scope.noWrapSlides = false
    $scope.slides = _.map(displayedRoutes, function(route) {
      route.notes = routeNoteFormattingFilter(route.notes)
      return {
        content: route
      }
    })
  }
})
