'use strict'

describe('Service: scatterPlotChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var scatterPlotChartSvc
  beforeEach(inject(function(_scatterPlotChartSvc_) {
    scatterPlotChartSvc = _scatterPlotChartSvc_
  }))

  describe('#processData(data)', function() {
    it('should output an array', function() {
      var inputArray = [
        {"id": 1, "rating": 4, "sector": "Jailhouse", "type": "Sport lead" },
        {"id": 2, "sector": "GWPC", "type": "Traditional" }, // Ommit rating on purpose
        {"id": 3, "rating": 3, "sector": "Dogpatch", "type": "Boulder" },
        {"id": 4, "rating": 4, "sector": "Dogpatch", "type": "Boulder" },
        {"id": 5, "rating": 2, "sector": "Jailhouse", "type": "Sport lead" },
        {"id": 6, "rating": 5, "sector": "Jailhouse", "type": "Sport lead" },
        {"id": 7, "rating": 1, "sector": "Jailhouse", "type": "Sport lead" }
      ]
      var expectedOutput = [
        {
          "sector": "Jailhouse",
          "avgRating": 3,
          "dominantType": "Sport lead",
          "totalRoutes": 4,
          "routesId": [1, 5, 6, 7]
        },
        {
          "sector": "GWPC",
          "avgRating": 0,
          "dominantType": "Traditional",
          "totalRoutes": 1,
          "routesId": [2]
        },
        {
          "sector": "Dogpatch",
          "avgRating": 3.5,
          "dominantType": "Boulder",
          "totalRoutes": 2,
          "routesId": [3, 4]
        }
      ]

      var output = scatterPlotChartSvc.processData(inputArray)
      expect(JSON.stringify(output) === JSON.stringify(expectedOutput)).toBe(true)
    })
  })

})
