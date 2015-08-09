'use strict'

describe('Service: overviewChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var overviewChartSvc
  beforeEach(inject(function(_overviewChartSvc_) {
    overviewChartSvc = _overviewChartSvc_
  }))

  describe('#processData(data)', function() {
    it('should output an array', function() {
      var year = new Date().getFullYear()
      var inputArray = [
        { "date": "05/12/" + year, "grade": "5.12b", "status": "Flash", "type": "Traditional" },
        { "date": "07/13/" + year, "grade": "V7", "status": "Redpoint", "type": "Boulder" },
        { "date": "07/07/" + year, "grade": "5.9", "status": "Onsight", "type": "Sport lead" }
      ]

      var outputObject = {}
      outputObject["05/12/" + year] = {
        "date": "05/12/" + year,
        "total": 1,
        "metrics": [
          {
            "type": "Traditional",
            "grade": "5.12b",
            "status": "Flash",
            "ease": 0,
            "count": 1
          }
        ]
      }
      outputObject["07/13/" + year] = {
        "date": "07/13/" + year,
        "total": 1,
        "metrics": [
          {
            "type": "Boulder",
            "grade": "V7",
            "status": "Redpoint",
            "ease": 0,
            "count": 1
          }
        ]
      }
      outputObject["07/07/" + year] = {
        "date": "07/07/" + year,
        "total": 1,
        "metrics": [
          {
            "type": "Sport lead",
            "grade": "5.9",
            "status": "Onsight",
            "ease": 0,
            "count": 1
          }
        ]
      }

      expect(_.isEqual(outputObject, overviewChartSvc.processData(inputArray))).toBe(true)
    })
  })

})
