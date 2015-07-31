'user strict'

angular.module('climbingMemo')
.directive('routeSummary', function() {
  return {
    scope: {
      route: '='
    },
    restrict: 'E',
    templateUrl: 'views/_routeSummary.html'
  }
})
