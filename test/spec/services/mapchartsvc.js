'use strict'

describe('Service: mapChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var mapChartSvc
  beforeEach(inject(function(_mapChartSvc_) {
    mapChartSvc = _mapChartSvc_
  }))

  it('should do something', function() {
    expect(!!mapChartSvc).toBe(true)
  })

})
