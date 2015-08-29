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
        {"id": 1, "date": "05/12/" + currentYear, "type": "Top rope" },
        {"id": 2, "date": "08/02/" + currentYear, "type": "Boulder" },
        {"id": 3, "date": "08/02/" + currentYear, "type": "Sport lead" },
        {"id": 4, "date": "08/01/" + currentYear, "type": "Sport lead" },
        {"id": 5, "date": "01/02/" + currentYear, "type": "Sport lead" },
        {"id": 6, "date": "08/13/" + currentYear, "type": "Sport lead" },
        {"id": 7, "date": "05/02/" + currentYear, "type": "Sport lead" }
      ]
      var expectedOutput = [
        {
          "date": "05" + currentYear,
          "type": [
            {
            "name": "Top rope", "sum": 1, "y0": 0, "y1": 1, "routesId": [1]
            },
            {
            "name": "Sport lead", "sum": 1, "y0": 1, "y1": 2, "routesId": [7]
            }
          ]
        },
        {
          "date": "08" + currentYear,
          "type": [
            {
            "name": "Boulder", "sum": 1, "y0": 0, "y1": 1, "routesId": [2]
            },
            {
            "name": "Sport lead", "sum": 3, "y0": 1, "y1": 4, "routesId": [3, 4, 6]
            }
          ]
        },
        {
          "date": "01" + currentYear,
          "type": [{
          "name": "Sport lead", "sum": 1, "y0": 0, "y1": 1, "routesId": [5]
          }]
        }
      ]

      var output = verticalBarChartSvc.processData(inputArray)

      expect(JSON.stringify(output) === JSON.stringify(expectedOutput)).toBe(true)
    })
  })

})
