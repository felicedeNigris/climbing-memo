'user strict'

angular.module('climbingMemo')
.directive('mainNavbar', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/views/_mainNavbar.html'
  }
})
