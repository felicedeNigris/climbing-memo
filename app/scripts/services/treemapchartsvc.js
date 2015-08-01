'use strict'

/**
* @ngdoc service
* @name climbingMemo.treemapChartSvc
* @description
* # treemapChartSvc
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('treemapChartSvc', function() {
  /**
  * Pre-process data to be rendered on a Calendar Heatmap
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array indexed by dates
  */
  this.processData = function(rawData) {
    var data = []
    return data
  }

})
