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
    .success(function() {
      notificationService.success(route.name + ' - note saved')
    })
    .error(function() {
      notificationService.error('Error while saving ' + route.name)
    })
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
