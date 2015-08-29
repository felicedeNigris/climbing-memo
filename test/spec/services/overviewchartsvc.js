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
        {
          "id": 1, "date": "05/12/" + year, "grade": "5.12b", "status":
          "Flash", "type": "Traditional"
        },
        {
          "id": 2, "date": "07/13/" + year, "grade": "V7", "status":
          "Redpoint", "type": "Boulder"
        },
        {
          "id": 3, "date": "07/07/" + year, "grade": "5.9", "status":
          "Onsight", "type": "Sport lead"
        }
      ]

      var expectedOutput = {}
      expectedOutput["05/12/" + year] = {
        "date": "05/12/" + year,
        "total": 1,
        "metrics": [
          {
            "id": 1,
            "type": "Traditional",
            "grade": "5.12b",
            "status": "Flash",
            "ease": 0,
            "count": 1
          }
        ]
      }
      expectedOutput["07/13/" + year] = {
        "date": "07/13/" + year,
        "total": 1,
        "metrics": [
          {
            "id": 2,
            "type": "Boulder",
            "grade": "V7",
            "status": "Redpoint",
            "ease": 0,
            "count": 1
          }
        ]
      }
      expectedOutput["07/07/" + year] = {
        "date": "07/07/" + year,
        "total": 1,
        "metrics": [
          {
            "id": 3,
            "type": "Sport lead",
            "grade": "5.9",
            "status": "Onsight",
            "ease": 0,
            "count": 1
          }
        ]
      }

      var output = overviewChartSvc.processData(inputArray)

      expect(JSON.stringify(output) === JSON.stringify(expectedOutput)).toBe(true)
    })
  })

})
