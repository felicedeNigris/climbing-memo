'user strict'

angular.module('climbingMemo')
.directive('headerOverview', function() {
  return {
    scope: true,
    restrict: 'E',
    templateUrl: 'views/_headerOverview.html'
  }
})
