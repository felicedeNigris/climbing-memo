'use strict'

/**
* @ngdoc directive
* @name climbingMemo.directive:treemapChart
* @description
* # treemapChart
*/
angular.module('climbingMemo')
.directive('treemapChart', function(treemapChartSvc) {
  // Private 5 digit chart ID
  var ID = _.random(10000, 99999)

  return {
    scope: {
      routes: '='
    },
    restrict: 'E',
    template: '<div id="chart-' + ID + '"></div>',
    link: function(scope, element, attrs) {

      scope.$watch('routes', function(rawData) {
        rawData = rawData || []

        var chart = getTreemap()
        .data(treemapChartSvc.processData(rawData))
        .width(element.parent().width())
        .height(300)

        d3.select('#chart-' + ID).call(chart)
      })

      /**
      * Create and return a TreeMap chart
      * created using D3.js
      *
      * @return {Function} Callable object to create chart
      */
      function getTreemap(data) {

        data = []
        var width = 800
        var height = 600

        function my(container) {

          // TODO Add code for chart generation

          var margin = {top: 20, right: 25, bottom: 60, left: 50},
          widthChart = width - margin.left - margin.right,
          heightChart = height - margin.top - margin.bottom
        }

        my.data = function(value) {
          if (!arguments.length) {
            return data
          }
          data = value
          return my
        }

        my.width = function(value) {
          if (!arguments.length) {
            return width
          }
          width = value
          return my
        }

        my.height = function(value) {
          if (!arguments.length) {
            return height
          }
          height = value
          return my
        }
        return my
      }
    }
  }
})
