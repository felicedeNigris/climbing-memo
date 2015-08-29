'use strict'

/**
* @ngdoc function
* @name climbingMemo.controller:ModalsliderCtrl
* @description
* # ModalsliderCtrl
* Controller of the climbingMemo
*/
angular.module('climbingMemo')
.controller('ModalsliderCtrl', function($scope, $modalInstance, routes) {

  /**
  * Close the modal
  *
  * @method closeModal
  */
  $scope.closeModal = function() {
    $modalInstance.dismiss('cancel')
  }

  $scope.initController = function() {
    $scope.myInterval = 5000;
    $scope.noWrapSlides = false;
    // $scope.slides = routes || []
    var slides = $scope.slides = [];
    $scope.addSlide = function() {
      var newWidth = 600 + slides.length + 1;
      slides.push({
        image: '//placekitten.com/' + newWidth + '/300',
        text: ['More','Extra','Lots of','Surplus'][slides.length % 4] + ' ' +
          ['Cats', 'Kittys', 'Felines', 'Cutes'][slides.length % 4]
      });
    };
    for (var i=0; i< routes.length ; i++) {
      $scope.addSlide();
    }
  }

  $scope.initController()
})
