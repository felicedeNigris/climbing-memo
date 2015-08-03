'use strict'

angular.module('climbingMemo')
.service('verticalBarChartSvc', function verticalBarChartSvc(utilsChartSvc) {
  /**
  * Pre-process data to be rendered on a Calendar Heatmap
  *
  * @params {Array} Flat routes objects
  * @return {Array} Array indexed by dates
  */
  this.processData = function(rawData) {
    // Group by Month-Year
    var months = []
    var month
    var monthDate

    for (var i=0 ; i < rawData.length ; i++) {

      var route = rawData[i]

      // Date format MM/DD/YYYY
      var splitDate = route.date.split("/")
      monthDate = splitDate[0] + splitDate[2]

      // Month name
      if (!(monthDate in months)) {
        months[monthDate] = {
          date:monthDate,
          type: []
        }
      }

      // Sector name in month
      month = months[monthDate]

      if (!(route.type in month.type)) {
        month.type[route.type] = {
          name: route.type,
          sum: 0,
          y0: 0,
          y1: 0
        }
      }

      month.type[route.type].sum += 1

    }

    // Sort by type sum TODO

    // Calculate y0 & y1 per type
    for (monthDate in months) {

      month = months[monthDate]
      var barSum = 0

      for (var type in month.type) {

        var barItem = month.type[type]

        barItem.y0 = barSum
        barSum += barItem.sum
        barItem.y1 = barSum
      }
    }

    // Convert Object to Array
    var data = []
    data = Object.keys(months).map(function(keyA) {
      var entry = months[keyA]
      entry.type = Object.keys(entry.type).map(function(keyB) {
        return entry.type[keyB]
      })
      return entry
    })

    return data
  }

})
