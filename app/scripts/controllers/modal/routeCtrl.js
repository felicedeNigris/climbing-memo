angular.module('climbingMemo')
.controller('modalRouteCtrl', function($scope, $modalInstance, route,
routesSvc, notificationService, routeNoteFormattingFilter) {

  route.notes = routeNoteFormattingFilter(route.notes)
  $scope.route = route

  /**
   * Save the route after editing the note on the modal
   *
   * @method saveRoute
   */
  $scope.saveRoute = function(route) {
    route.$editNotes = false
    routesSvc.updateRoute(route, route.$id)
    .then(function() {
      notificationService.success(route.name + ' - note saved')
    })
    .catch(function() {
      notificationService.error('Error while saving ' + route.name)
    })
  }

  /**
  * Watch or Unwatch a route and save it
  *
  * @method toggleWatchRoute
  * @param {Object} route: climbing route
  */
  $scope.toggleWatchRoute = function(route) {
    route.watch = !route.watch
    $scope.saveRoute(route)
  }

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
    $modalInstance.dismiss('cancel')
  }

})
