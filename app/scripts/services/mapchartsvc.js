'use strict'

/**
* @ngdoc service
* @name climbingMemo.mapChartSvc.js
* @description
* # mapChartSvc.js
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('mapChartSvc', function(utilsChartSvc) {

  /**
  * Pre-process data to be rendered on a Map
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array of locations
  */
  this.processData = function(rawData) {

    // Create hashmap of sites
    var locations = utilsChartSvc.arrayToHashtable(rawData,'location')

    // Calculate metrics for sites
    var data = []
    for (var key in locations) {

      var routes = locations[key]

      var metrics = []
      var sectors = utilsChartSvc.arrayToHashtable(routes,'sector')

      // }, 0) / sectorsRating.length

      for (var sector in sectors) {

        metrics.push({
          sector: sector,
          count: sectors[sector].length,
          type: utilsChartSvc.arrayGroupBy(sectors[sector], 'type')[0],
          rating: (_.reduce(sectors[sector], function(result, n) {
            return result += n.rating
          }, 0) / sectors[sector].length).toFixed(1)
        })
      }
      metrics.sort(function(a,b) { return a.count < b.count; })

      data.push({
        name: key,
        coords: {
          latitude: routes[0].latitude,
          longitude: routes[0].longitude
        },
        metrics: metrics
      })
    }

    return data
  }
})
