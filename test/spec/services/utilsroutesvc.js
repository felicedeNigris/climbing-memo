'use strict'

describe('Service: utilsRouteSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var utilsRouteSvc, utilsChartSvc
  beforeEach(inject(function(_utilsRouteSvc_, _utilsChartSvc_) {
    utilsRouteSvc = _utilsRouteSvc_
    utilsChartSvc = _utilsChartSvc_
    spyOn(utilsChartSvc, 'typeColor').and.returnValue('green')
  }))

  it('should #getTypeColor', function() {
    var route = {type: 'test'}
    var output = utilsRouteSvc.getTypeColor(route)

    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('test')
    expect(output).toMatch('green')

    output = utilsRouteSvc.getTypeColor()
    expect(utilsChartSvc.typeColor).toHaveBeenCalledWith('')
  })

  it('should #getIndoorLabel', function() {
    var route = { rock: 'Indoor' }
    var output = utilsRouteSvc.getIndoorLabel(route)
    expect(output).toMatch('Indoor')

    route = { rock: 'Other' }
    output = utilsRouteSvc.getIndoorLabel(route)
    expect(output).toMatch('Outdoor')
  })

  it('should #getIconRock', function() {
    var route = { rock: 'Indoor' }
    var output = utilsRouteSvc.getIconRock(route)
    expect(output).toMatch('fa-home')

    route = { rock: 'Other' }
    output = utilsRouteSvc.getIconRock(route)
    expect(output).toMatch('fa-sun-o')

    output = utilsRouteSvc.getIconRock()
    expect(output).toMatch('fa-connectdevelop')
  })

  it('should #getIconStatus', function() {
    var route = { status: 'Attempt' }
    var output = utilsRouteSvc.getIconStatus(route)
    expect(output).toMatch('fa-times')

    route = { status: 'Other' }
    output = utilsRouteSvc.getIconStatus(route)
    expect(output).toMatch('fa-check')

    output = utilsRouteSvc.getIconStatus()
    expect(output).toMatch('fa-connectdevelop')
  })
})
