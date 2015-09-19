'use strict'

/**
* @ngdoc type
* @name climbingMemo.type:sliderCharts
* @description
* # sliderCharts
*/
angular.module('climbingMemo')
.directive('sliderCharts', function($compile, $rootScope) {
  return {
    templateUrl: 'views/_sliderCharts.html',
    restrict: 'E',
    scope: {
      routes: '='
    },
    link: function postLink(scope, element, attrs) {

      scope.slides = [
        {
          title: 'Sector quality',
          type: 'scatter-plot-chart',
          icon: 'fa-star-o'
        },
        {
          title: 'Climb quantity',
          type: 'vertical-bar-chart',
          icon: 'fa-bar-chart'
        },
        {
          title: 'Favorite climb type difficulty',
          type: 'horizontal-bar-chart',
          icon: 'fa-bar-chart'
        },
        {
          title: 'Climb diversity',
          type: 'treemap-chart',
          icon: 'fa-th-large'
        }
      ]

      /**
      * Dynamically compile chart into element
      *
      * @param {String} type
      */
      scope.renderChart = function(type) {
        scope.width = element.parent().width()
        var directive = '<' + type + ' routes="routes" width="width"></' + type + '>'
        element.find('.chart-' + type).empty().append(directive)

        $compile(element.find(type))(scope)
      }

      scope.$watch(function () {
        return _.find(scope.slides, function(slide){
          return slide.active
        })
      }, function (currentSlide, previousSlide) {
        if (currentSlide !== previousSlide) {
          scope.renderChart(currentSlide.type)
        }
      })
    }
  }
})
