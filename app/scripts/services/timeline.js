'use strict'

/**
* @ngdoc service
* @name climbingMemo.timeline
* @description
* # timeline
* Service in the climbingMemo.
*/
angular.module('climbingMemo')
.service('timelineSvc', function(utilsChartSvc) {

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

    // Group by sectors and sort
    locations = _.map(locations, function(areaLocation) {
      areaLocation.sectors = _.map(utilsChartSvc.arrayGroupBy(areaLocation.routes, 'sector'),
      function(sector) {
        return areaLocation.routes.filter(function(route) {
          return route.sector == sector
        }).sort(function(routeA, routeB){
          return utilsChartSvc.compareRouteGrade(routeB.grade, routeA.grade)
        })
      })
      return areaLocation
    })

    // Calculate first/last date per locations
    locations = _.map(locations, function(areaLocation) {
      areaLocation.start = _.first(areaLocation.routes).date
      areaLocation.end   = _.last(areaLocation.routes).date
      return areaLocation
    })

    // Generate output data
    var data = _.map(locations, function(areaLocation) {
      var routeTypes = utilsChartSvc.arrayGroupBy(areaLocation.routes, 'type')
      var routeRocks = utilsChartSvc.arrayGroupBy(areaLocation.routes, 'rock')
      delete areaLocation.routes
      return {
        mainType: _.first(routeTypes),
        isIndoor: _.first(routeRocks) === 'Indoor',
        content: areaLocation
      }
    })

    return data
  }
})
