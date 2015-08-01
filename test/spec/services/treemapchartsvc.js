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
        { "location": "Dogpatch, CA", "type": "Boulder" },
        { "location": "Jamestown, CA", "type": "Sport lead" },
        { "location": "Oakland, CA", "type": "Sport lead" },
        { "location": "Jamestown, CA", "type": "Sport lead" }
      ]
      var outputTree = {
        "name": "Climbs",
        "children": [
          {
            "name": "Boulder",
            "children": [{ "name": "Dogpatch, CA", "count": 1 }]
          },
          {
            "name": "Sport lead",
            "children": [
              { "name": "Jamestown, CA", "count": 2 },
              { "name": "Oakland, CA", "count": 1 }
            ]
          }
        ]
      }

      expect(_.isEqual(outputTree, treemapChartSvc.processData(inputArray))).toBe(true)
    })
  })

})
