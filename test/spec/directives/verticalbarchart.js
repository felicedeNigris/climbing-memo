'use strict'

describe('Directive: verticalBarChart', function() {

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

    element = angular.element('<vertical-bar-chart routes="routes"></vertical-bar-chart>')
    element = compile(element)(scope)
  }

  it('should draw rectangles for each routes', function() {
    var currentYear = new Date().getFullYear()
    var routes= [
      { "date": "05/12/" + currentYear, "type": "Top rope" },
      { "date": "08/13/" + currentYear, "type": "Sport lead" }
    ]
    prepareDirective(routes)
    expect(element.find('rect').length).toBe(2)
  })

  it('should let you chain the configuration', function() {
    var routes = []
    prepareDirective(routes)

    var chart = element.isolateScope().getVerticalBar()
      .data([1,2,3])
      .width(200)
      .height(100)

    expect(chart.width()).toBe(200)
    expect(chart.height()).toBe(100)
    expect(chart.data().length).toBe(3)
  })

  it('should draw axis when no data sent', function() {
    prepareDirective([])

    expect(element.find('svg').length).toBe(1)
    expect(element.find('.x.axis').length).toBe(1)
    expect(element.find('.y.axis').length).toBe(1)
  })

  it('should re-draw the chart when routes change', function() {
    var routes = []
    var currentYear = new Date().getFullYear()
    prepareDirective(routes)

    scope.routes = [
      { "date": "05/12/" + currentYear, "type": "Top rope" },
      { "date": "08/13/" + currentYear, "type": "Sport lead" }
    ]
    scope.$digest()

    expect(element.find('rect').length).toBe(2)
  })
})
