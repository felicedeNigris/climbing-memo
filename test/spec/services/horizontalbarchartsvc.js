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
        { "grade": "5.14a", "type": "Sport lead" },
        { "grade": "5.13b", "type": "Sport lead" },
        { "grade": "5.13a", "type": "Sport lead" },
        { "grade": "5.13c", "type": "Sport lead" },
        { "grade": "5.13b", "type": "Sport lead" },
        { "grade": "5.13a", "type": "Sport lead" },
        { "grade": "5.13b", "type": "Sport lead" }
      ]
      var outputArray = [
        { "name": "Sport lead", "grade": "5.14a", "total": 1 },
        { "name": "Sport lead", "grade": "5.13b", "total": 3 },
        { "name": "Sport lead", "grade": "5.13a", "total": 2 },
        { "name": "Sport lead", "grade": "5.13c", "total": 1 }
      ]

      expect(_.isEqual(
        outputArray,
        horizontalBarChartSvc.processData(inputArray, 'Sport lead')
      )).toBe(true)
    })
  })
})
