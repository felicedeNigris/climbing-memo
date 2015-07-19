'user strict'

angular.module('climbingMemo')
.directive('routeSummary', function() {
  return {
    scope: {
      route: '='
    },
    restrict: 'E',
    templateUrl: 'app/views/_routeSummary.html'
  }
})
