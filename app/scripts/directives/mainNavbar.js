'user strict'

angular.module('climbingMemo')
.directive('mainNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'views/_mainNavbar.html'
  }
})
