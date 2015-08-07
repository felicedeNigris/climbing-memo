'use strict'

/**
* @ngdoc directive
* @name climbingMemo.directive:routesPagination
* @description
* # routesPagination
*/
angular.module('climbingMemo')
.directive('routesPagination', function() {
  return {
    templateUrl: 'views/_routesPagination.html',
    restrict: 'E',
    scope: {
      routes: '=',
      itemsPerPage: '='
    },
    controller: function ($scope) {
      var routesArray = []

      $scope.$watch('routes', function(routes) {
        initController(routes)
      })

      $scope.$watch('itemsPerPage', function() {
        $scope.pageChanged()
      })

      var initController = function(routes) {
        routesArray = _.toArray(routes)

        $scope.totalItems = routesArray.length
        $scope.currentPage = $scope.currentPage || 1
        $scope.maxSize = 3
      }

      /**
      * @method pageChanged
      *
      * @return {Array} Id of ccurrent page
      * n=1: [0 ; itemsPerPage * 1]
      * n=2: [itemsPerPage ; itemsPerPage * 2]
      * n=3: [itemsPerPage * 2 ; itemsPerPage * 3]
      * n=X: [(n-X) * itemsPerPage ; itemsPerPage * X]
      */
      $scope.pageChanged = function() {
        var current = $scope.currentPage
        var itemsPerPage = $scope.itemsPerPage

        $scope.$emit('routesTableVisibility', _.pluck(_.slice(
          routesArray,
          (current - 1) * itemsPerPage, // Start
          itemsPerPage * current // End
        ), 'id'))
      }
    }
  }
})
