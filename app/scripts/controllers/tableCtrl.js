'use strict'

angular.module('climbingMemo')
.controller('tableCtrl', function($scope, $rootScope, $modal, utilsChartSvc,
utilsRouteSvc, DTOptionsBuilder) {


  // Get Data
  utilsRouteSvc.getRoutes().then(function(data) {
    $scope.initController(data)
  })

  $scope.dtOptions = DTOptionsBuilder
    .newOptions()
    .withBootstrap()
    .withOption('sDom', "<'no-row'" +
      "<'col-xs-4 hidden-xs'l><'col-xs-8'f>r>" + // Header
      "t" + // Table
      "<'no-row'<'col-xs-4 hidden-xs'i><'col-xs-8'p>>" // Footer
    )
    .withOption('oLanguage', {
      'sLengthMenu': '<i class="fa hidden-xs fa-eye"></i> _MENU_',
      'sSearch': '<i class="fa hidden-xs fa-search"></i>',
      'sSearchPlaceholder': 'Filter routes',
      // 'sInfo': 'Total <b>_TOTAL_</b>',
      // 'sInfoEmpty': 'Total <b>_TOTAL_</b></span>',
      'sEmptyTable': 'No climbing routes found',
      'oPaginate': {
        'sNext': '<i class="fa fa-angle-right"></i>',
        'sPrevious': '<i class="fa fa-angle-left"></i>'
      }
    })

  // Watch Update event
  $rootScope.$on('routesUpdated', function() {
    utilsRouteSvc.getRoutes().then(function(data) {
      $scope.initController(data)
    })
  })

  /**
  * Initialize controller with data
  *
  * @method initController
  * @param {Object} Routes
  */
  $scope.initController = function(data) {
    var count = 0
    _.map(data, function(route, key) {
      route.$date    = route.date
      route.$id      = key
      count++
    })
    $scope.routes = data

    var arrayRoutes    = _.toArray($scope.routes)
    var arrayLocations = utilsChartSvc.arrayGroupBy(arrayRoutes,"location")
    var arraySectors   = utilsChartSvc.arrayGroupBy(arrayRoutes,"sector")

    $scope.locations = arrayLocations
    $scope.sectors   = arraySectors
  }

  /**
   * Get route color based on type
   *
   * @method getTypeColor
   * @param {Object} Route
   *
   * @return {String} Css color
   */
  $scope.getTypeColor = function(route) {
    return utilsChartSvc.typeColor(route.type)
  }

  /**
  * Create a route object in the scope using default values
  *
  * @method addRoute
  */
  $scope.addRoute = function() {
    $modal.open({
      templateUrl: 'views/_modalAddRoute.html',
      controller: 'ModaladdrouteCtrl',
      size: 'md'
    })
  }

  /**
  * Open a modal to display route details
  *
  * @method openRouteModal
  */
  $scope.openRouteModal = function(route) {
    $modal.open({
      templateUrl: 'views/sliderModal.html',
      controller: 'ModalsliderCtrl',
      size: 'md',
      resolve: {
        routesId: function() {
          return [route.id]
        }
      }
    })
  }

})

