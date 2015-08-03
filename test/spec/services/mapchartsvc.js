'use strict'

describe('Service: mapChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var mapChartSvc
  beforeEach(inject(function(_mapChartSvc_) {
    mapChartSvc = _mapChartSvc_
  }))

  it('should do something', function() {
    var inputArray = [
        {
          "latitude": 37.9532584,
          "location": "Jamestown, CA",
          "longitude": -120.4226952,
          "rating": 4,
          "sector": "Jailhouse",
          "type": "Sport lead"
        },
        {
          "latitude": 37.9532584,
          "location": "Jamestown, CA",
          "longitude": -120.4226952,
          "rating": 4,
          "sector": "Jailhouse",
          "type": "Sport lead"
        },
        {
          "latitude": 37.8043637,
          "location": "GWPC Oakland, CA",
          "longitude": -122.2711137,
          "rating": 4,
          "sector": "GWPC",
          "type": "Top rope"
        },
        {
          "latitude": 37.7749295,
          "location": "Dogpatch Boulers, SF",
          "longitude": -122.4194155,
          "rating": 3,
          "sector": "Dogpatch",
          "type": "Boulder"
        },
        {
          "latitude": 37.7749295,
          "location": "Dogpatch Boulers, SF",
          "longitude": -122.4194155,
          "rating": 4,
          "sector": "Dogpatch",
          "type": "Boulder"
        },
        {
          "latitude": 37.9532584,
          "location": "Jamestown, CA",
          "longitude": -120.4226952,
          "rating": 2,
          "sector": "Jailhouse",
          "type": "Sport lead"
        },
        {
          "latitude": 37.9532584,
          "location": "Jamestown, CA",
          "longitude": -120.4226952,
          "rating": 5,
          "sector": "Jailhouse",
          "type": "Sport lead"
        },
        {
          "latitude": 37.9532584,
          "location": "Jamestown, CA",
          "longitude": -120.4226952,
          "rating": 1,
          "sector": "Jailhouse",
          "type": "Sport lead"
        }
      ]
      var outputArray = [
        {
          "name": "Jamestown, CA",
          "coords": { "latitude": 37.9532584, "longitude": -120.4226952 },
          "metrics": [
            { "sector": "Jailhouse", "count": 5, "type": "Sport lead", "rating": "3.2" }
          ]
        },
        {
          "name": "GWPC Oakland, CA",
          "coords": { "latitude": 37.8043637, "longitude": -122.2711137 },
          "metrics": [
            { "sector": "GWPC", "count": 1, "type": "Top rope", "rating": "4.0" }
          ]
        },
        {
          "name": "Dogpatch Boulers, SF",
          "coords": { "latitude": 37.7749295, "longitude": -122.4194155 },
          "metrics": [
            { "sector": "Dogpatch", "count": 2, "type": "Boulder", "rating": "3.5" }
          ]
        }
      ]

      expect(_.isEqual(outputArray, mapChartSvc.processData(inputArray))).toBe(true)
  })

})
