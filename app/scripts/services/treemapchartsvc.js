'use strict'

/**
* @ngdoc service
* @name climbingMemo.treemapChartSvc
* @description
* # treemapChartSvc
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('treemapChartSvc', function(utilsChartSvc) {
  /**
  * Pre-process data to be rendered on a Calendar Heatmap
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array indexed by dates
  */
  this.processData = function(rawData) {

    // Tree first level - Routes Types
    var treeTypes = []
    _.mapKeys(utilsChartSvc.arrayToHashtable(rawData, 'type'), function(value, type) {

      // Tree second level - Routes Locations
      var routesLocations = []
      _.mapKeys(utilsChartSvc.arrayToHashtable(value, 'location'), function(value, location) {
        routesLocations.push({
          name: location,
          count: value.length
        })
      })

      treeTypes.push({
        name: type,
        children: routesLocations
      })
    })

    var data = {}
    data.name = 'Climbs'
    data.children = treeTypes

    return data
  }
})
