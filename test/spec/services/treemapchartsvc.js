'use strict'

describe('Service: treemapChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var treemapChartSvc
  beforeEach(inject(function(_treemapChartSvc_) {
    treemapChartSvc = _treemapChartSvc_
  }))

  describe('#processData(data)', function() {
    it('should output a tree', function() {
      var inputArray = [
        {"id": 1, "location": "Dogpatch, CA", "type": "Boulder" },
        {"id": 2, "location": "Jamestown, CA", "type": "Sport lead" },
        {"id": 3, "location": "Oakland, CA", "type": "Sport lead" },
        {"id": 4, "location": "Jamestown, CA", "type": "Sport lead" }
      ]
      var expectedOutput = {
        "name": "Climbs",
        "children": [
          {
            "name": "Boulder",
            "children": [{ "name": "Dogpatch, CA", "count": 1, "routesId": [1] }]
          },
          {
            "name": "Sport lead",
            "children": [
              { "name": "Jamestown, CA", "count": 2, "routesId": [2, 4] },
              { "name": "Oakland, CA", "count": 1, "routesId": [3] }
            ]
          }
        ]
      }

      var output = treemapChartSvc.processData(inputArray)

      expect(JSON.stringify(output) === JSON.stringify(expectedOutput)).toBe(true)
    })
  })

})
