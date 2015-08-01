'use strict'

angular.module('climbingMemo')
.service('horizontalBarChartSvc', function horizontalBarChartSvc(utilsChartSvc) {
  /**
  * Pre-process data to be rendered on a Calendar Heatmap
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array indexed by dates
  */
  this.processData = function(rawData, type) {

    // Filter by Type
    rawData = rawData.filter(function(d) { return d.type === type})

    // Group by Grade
    var grades = utilsChartSvc.arrayToHashtable(rawData,'grade')

    // Convert to array
    var data = []
    for (var grade in grades) {
      data.push({
        name: type,
        grade: grade,
        total: grades[grade].length
      })
    }

    // Sort by grade
    data = data.sort(function(a,b) { return utilsChartSvc.compareRouteGrade(a.grade,b.grade) })

    return data
  }
})
