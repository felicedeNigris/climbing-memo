'use strict'

describe('Directive: horizontalBarChart', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var rootScope, element, scope, compile

  beforeEach(inject(function($rootScope, $compile) {
    rootScope = $rootScope
    compile = $compile
  }))

  var prepareDirective = function(routes, type) {
    scope = rootScope.$new()
    scope.routes = routes
    scope.type = type

    element = angular.element(
      '<horizontal-bar-chart routes="routes" type="type"></horizontal-bar-chart>'
    )
    element = compile(element)(scope)
  }

  it('should draw rectangles for each route grade', function() {
    var currentYear = new Date().getFullYear()
    var routes = [
      { "grade": "5.14a", "type": "Sport lead" },
      { "grade": "5.13b", "type": "Sport lead" },
      { "grade": "5.13a", "type": "Sport lead" },
      { "grade": "5.13c", "type": "Sport lead" },
      { "grade": "5.13b", "type": "Sport lead" },
      { "grade": "5.13a", "type": "Sport lead" },
      { "grade": "5.13b", "type": "Sport lead" }
    ]
    prepareDirective(routes, 'Sport lead')

    expect(element.find('rect').length).toBe(4)
  })

  it('should let you chain the configuration', function() {
    var routes = []
    prepareDirective(routes, 'Sport lead')

    var chart = element.isolateScope().getHorizontalBar()
      .data([1,2,3])
      .width(200)
      .height(100)

    expect(chart.width()).toBe(200)
    expect(chart.height()).toBe(100)
    expect(chart.data().length).toBe(3)
  })

  it('should draw axis when no data sent', function() {
    prepareDirective([], 'Sport lead')

    expect(element.find('svg').length).toBe(1)
    expect(element.find('.x.axis').length).toBe(1)
    expect(element.find('.y.axis').length).toBe(1)
  })

  it('should re-draw the chart when routes change', function() {
    var routes = []
    var currentYear = new Date().getFullYear()
    prepareDirective(routes, 'Sport lead')

    scope.routes = [
      { "grade": "5.14a", "type": "Sport lead" },
      { "grade": "5.13b", "type": "Sport lead" }
    ]
    scope.$digest()

    expect(element.find('rect').length).toBe(2)
  })
})
