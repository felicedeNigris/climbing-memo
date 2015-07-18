'user strict'

angular.module('climbingMemo')
.directive('headerOverview', function() {
  return {
    scope: true,
    restrict: 'E',
    templateUrl: 'app/views/_headerOverview.html'
  }
})
