'use strict'

describe('Service: verticalBarChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var verticalBarChartSvc
  beforeEach(inject(function(_verticalBarChartSvc_) {
    verticalBarChartSvc = _verticalBarChartSvc_
  }))

  describe('#processData(data)', function() {
    it('should group routes per month', function() {
      var currentYear = new Date().getFullYear()

      var inputArray = [
        { "date": "05/12/" + currentYear, "type": "Top rope" },
        { "date": "08/02/" + currentYear, "type": "Boulder" },
        { "date": "08/02/" + currentYear, "type": "Sport lead" },
        { "date": "08/01/" + currentYear, "type": "Sport lead" },
        { "date": "01/02/" + currentYear, "type": "Sport lead" },
        { "date": "08/13/" + currentYear, "type": "Sport lead" },
        { "date": "05/02/" + currentYear, "type": "Sport lead" }
      ]
      var outputArray = [
        {
          "date": "05" + currentYear,
          "type": [
            { "name": "Top rope", "sum": 1, "y0": 0, "y1": 1 },
            { "name": "Sport lead", "sum": 1, "y0": 1, "y1": 2 }
          ]
        },
        {
          "date": "08" + currentYear,
          "type": [
            { "name": "Boulder", "sum": 1, "y0": 0, "y1": 1 },
            { "name": "Sport lead", "sum": 3, "y0": 1, "y1": 4 }
          ]
        },
        {
          "date": "01" + currentYear,
          "type": [{ "name": "Sport lead", "sum": 1, "y0": 0, "y1": 1 }]
        }
      ]

      expect(_.isEqual(outputArray, verticalBarChartSvc.processData(inputArray))).toBe(true)
    })
  })

})
