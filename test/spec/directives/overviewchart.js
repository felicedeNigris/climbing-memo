'use strict'

describe('Directive: overviewChart', function() {

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

    element = angular.element('<overview-chart routes="routes"></overview-chart>')
    element = compile(element)(scope)
  }

  it('should let you chain the configuration', function() {
    var routes = []
    prepareDirective(routes)

    var chart = element.isolateScope().getCalendarHeatmap()
      .data([1,2,3])
      .cellSize(10)

    expect(chart.data().length).toBe(3)
    expect(chart.cellSize()).toBe(10)
  })

})
