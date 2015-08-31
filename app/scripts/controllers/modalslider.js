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
$localStorage, routesSvc, $log, routeNoteFormattingFilter, utilsChartSvc) {

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

    $scope.myInterval = 0
    $scope.noWrapSlides = false
    $scope.slides = _.map(displayedRoutes, function(route) {
      route.notes = routeNoteFormattingFilter(route.notes)
      return {
        content: route
      }
    })
  }

  $scope.getIconStatus = function(route) {
    return route.status === 'Attempt' ? 'fa-times' : 'fa-check'
  }

  $scope.getIconRock = function(route) {
    return route.rock === 'Indoor' ? 'fa-home' : 'fa-sun-o'
  }

  $scope.getTimes = function(n) {
    return new Array(n)
  }

  $scope.flipCard = function() {
    var activeSlide = _.first($scope.slides.filter(function(slide) {
      return slide.active
    }))
    activeSlide.$hover = !activeSlide.$hover
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
