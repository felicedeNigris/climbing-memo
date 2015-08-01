'use strict'

describe('Service: treemapChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var treemapChartSvc
  beforeEach(inject(function(_treemapChartSvc_) {
    treemapChartSvc = _treemapChartSvc_
  }))

  it('should do something', function() {
    expect(!!treemapChartSvc).toBe(true)
  })

})
