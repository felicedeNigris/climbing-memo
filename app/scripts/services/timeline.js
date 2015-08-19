'use strict'

/**
* @ngdoc service
* @name climbingMemo.timeline
* @description
* # timeline
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('timelineSvc', function() {

  /**
  * Pre-process data to be rendered on a timeline
  *
  * @params {Array} Flat routes objects
  * @return {Object} Tree of properties
  */
  this.processData = function(rawData) {
    if (!rawData) {
      return []
    }

    // Sort by date
    var routes = _.map(rawData, function(route) {
      route.moment = moment(route.date, 'MM-DD-YYYY')
      return route
    })

    routes.sort(function(a,b) {
      return b.moment.unix() - a.moment.unix()
    })

    // Group by Locations
    var currentLocation
    var locations = _.reduce(routes, function(result, route) {
      if (currentLocation !== route.location) {
        result.push({
          areaLocation: route.location,
          routes: []
        })
        currentLocation = route.location
      }
      var currentRoutes = _.last(result).routes
      currentRoutes.push(route)
      return result
    }, [])

    // Calculate first/last date per locations
    locations = _.map(locations, function(areaLocation) {
      areaLocation.start = _.first(areaLocation.routes).date
      areaLocation.end   = _.last(areaLocation.routes).date
      return areaLocation
    })

    // Generate output data
    var data = _.map(locations, function(areaLocation) {
      return {
        badgeClass: 'info',
        badgeIconClass: 'glyphicon-check',
        content: areaLocation
      }
    })
    console.log(data)

    return data
  }
})
