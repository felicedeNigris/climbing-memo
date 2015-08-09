'use strict'

describe('Directive: treemapChart', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var rootScope, element, scope, compile

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope
    compile = $compile
  }))

  var prepareDirective = function(routes) {
    scope = rootScope.$new()
    scope.routes = routes

    element = angular.element('<treemap-chart routes="routes"></treemap-chart>')
    element = compile(element)(scope)
  }

  it('should let you chain the configuration', function() {
    var routes = []
    prepareDirective(routes)

    var chart = element.isolateScope().getTreemap()
      .data([1,2,3])
      .width(200)
      .height(100)

    expect(chart.width()).toBe(200)
    expect(chart.height()).toBe(100)
    expect(chart.data().length).toBe(3)
  })

  it('should draw rectangles for each routes locations', function() {
    var routes = [
      { "location": "Dogpatch, CA", "type": "Boulder" },
      { "location": "Jamestown, CA", "type": "Sport lead" },
      { "location": "Oakland, CA", "type": "Sport lead" },
      { "location": "Jamestown, CA", "type": "Sport lead" }
    ]
    prepareDirective(routes)

    expect(element.find('rect').length).toBe(3)
  })

  it('should re-draw the chart when routes change', function() {
    var routes = []
    prepareDirective(routes)

    scope.routes = [
      { "location": "Dogpatch, CA", "type": "Boulder" },
      { "location": "Jamestown, CA", "type": "Sport lead" }
    ]
    scope.$digest()

    expect(element.find('rect').length).toBe(2)
  })
})
