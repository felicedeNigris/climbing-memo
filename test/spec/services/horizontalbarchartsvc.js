'use strict'

describe('Service: horizontalBarChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var horizontalBarChartSvc
  beforeEach(inject(function(_horizontalBarChartSvc_) {
    horizontalBarChartSvc = _horizontalBarChartSvc_
  }))

  describe('#processData(data)', function() {
    it('should group routes per month', function() {
      var currentYear = new Date().getFullYear()

      var inputArray = [
        { "id": 1, "grade": "5.14a", "type": "Sport lead" },
        { "id": 2, "grade": "5.13b", "type": "Sport lead" },
        { "id": 3, "grade": "5.13a", "type": "Sport lead" },
        { "id": 4, "grade": "5.13c", "type": "Sport lead" },
        { "id": 5, "grade": "5.13b", "type": "Sport lead" },
        { "id": 6, "grade": "5.13a", "type": "Sport lead" },
        { "id": 7, "grade": "5.13b", "type": "Sport lead" }
      ]
      var expectedArray = [
        { "name": "Sport lead", "grade": "5.14a", "total": 1, "routesId": [1] },
        { "name": "Sport lead", "grade": "5.13b", "total": 3, "routesId": [2, 5, 7] },
        { "name": "Sport lead", "grade": "5.13a", "total": 2, "routesId": [3, 6] },
        { "name": "Sport lead", "grade": "5.13c", "total": 1, "routesId": [4] }
      ]

      var output = horizontalBarChartSvc.processData(inputArray,'Sport lead')

      expect(JSON.stringify(output) === JSON.stringify(expectedArray)).toBe(true)
    })
  })
})
