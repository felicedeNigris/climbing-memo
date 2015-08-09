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
        { "rating": 4, "sector": "Jailhouse", "type": "Sport lead" },
        { "sector": "GWPC", "type": "Traditional" }, // Ommit rating on purpose
        { "rating": 3, "sector": "Dogpatch", "type": "Boulder" },
        { "rating": 4, "sector": "Dogpatch", "type": "Boulder" },
        { "rating": 2, "sector": "Jailhouse", "type": "Sport lead" },
        { "rating": 5, "sector": "Jailhouse", "type": "Sport lead" },
        { "rating": 1, "sector": "Jailhouse", "type": "Sport lead" }
      ]
      var outputArray= [
        {
          "sector": "Jailhouse",
          "avgRating": 3,
          "dominantType": "Sport lead",
          "totalRoutes": 4
        },
        {
          "sector": "GWPC",
          "avgRating": 0,
          "dominantType": "Traditional",
          "totalRoutes": 1
        },
        {
          "sector": "Dogpatch",
          "avgRating": 3.5,
          "dominantType": "Boulder",
          "totalRoutes": 2
        }
      ]

      expect(_.isEqual(outputArray, scatterPlotChartSvc.processData(inputArray))).toBe(true)
    })
  })

})
