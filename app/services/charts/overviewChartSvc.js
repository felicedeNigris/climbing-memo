'use strict'

angular.module('climbingMemo')
.service('overviewChartSvc', function overviewChartSvc(utilsChartSvc) {
  /**
  * Pre-process data to be rendered on a Calendar Heatmap
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array indexed by dates
  */
  this.processData = function(rawData) {
    var type
    var sortRouteGrade

    // Create hashmap of dates
    var dates = utilsChartSvc.arrayToHashtable(rawData,'date')

    // Calculate difficulty per climbing type (sorted hardest to easiest)
    var allTypes = utilsChartSvc.arrayToHashtable(rawData,'type')
    var difficulties = []
    sortRouteGrade = function(a, b) {
      return !utilsChartSvc.compareRouteGrade(a,b)
    }

    for (type in allTypes) {
      difficulties[type] = utilsChartSvc.arrayGroupBy(allTypes[type],'grade')
      .sort(sortRouteGrade)
    }

    // Calculate metrics at dates for each climbing type
    var data = []
    sortRouteGrade = function(a, b) {
      return !utilsChartSvc.compareRouteGrade(a.grade, b.grade)
    }
    for (var key in dates){

      var routes = dates[key]

      var metrics = []
      var dayTypes = utilsChartSvc.arrayToHashtable(routes,'type')
      for (type in dayTypes) {

        var typeRoutes = dayTypes[type]
        typeRoutes.sort(sortRouteGrade)

        // Routes sorted hardest to easiest
        var hardestRoute = typeRoutes[0]

        var position = difficulties[hardestRoute.type].indexOf(hardestRoute.grade)
        var ease = Math.abs(parseFloat(position)/allTypes[type].length)

        if (!hardestRoute.grade) {
          hardestRoute.grade = ''
        }

        metrics.push({
          type: hardestRoute.type,
          grade: hardestRoute.grade,
          status: hardestRoute.status,
          ease: ease,
          count: dayTypes[type].length
        })
      }
      metrics.sort(function (a,b) { return a.count < b.count; })

      data[key] = {
        date: key,
        total: dates[key].length,
        metrics: metrics
      }
    }

    return data
  }

})
