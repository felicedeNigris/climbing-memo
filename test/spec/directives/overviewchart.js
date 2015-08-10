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

  it('should fill rectangles for each routes day', function() {
    var year = new Date().getFullYear()
    var routes = [
      { "date": "05/12/" + year, "grade": "5.12b", "status": "Flash", "type": "Traditional" },
      { "date": "07/13/" + year, "grade": "V7", "status": "Redpoint", "type": "Boulder" },
      { "date": "07/13/" + year, "grade": "V5", "status": "Onsight", "type": "Boulder" },
      { "date": "07/07/" + year, "grade": "5.9", "status": "Onsight", "type": "Sport lead" }
    ]
    prepareDirective(routes)

    expect(element.find('rect.climbDay').length).toBe(3)
  })

  it('should re-draw the chart when routes change', function() {
    var routes = []
    var year = new Date().getFullYear()
    prepareDirective(routes)

    scope.routes = [
      { "date": "05/12/" + year, "grade": "5.12b", "status": "Flash", "type": "Traditional" }
    ]
    scope.$digest()

    expect(element.find('rect.climbDay').length).toBe(1)
  })
})
