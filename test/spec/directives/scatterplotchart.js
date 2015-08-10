'use strict'

describe('Directive: scatterPlotChart', function() {

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

    element = angular.element('<scatter-plot-chart routes="routes"></scatter-plot-chart>')
    element = compile(element)(scope)
  }

  it('should draw circles for each locations', function() {
    var currentYear = new Date().getFullYear()
    var routes = [
      { "rating": 4, "sector": "Jailhouse", "type": "Sport lead" },
      { "sector": "GWPC", "type": "Traditional" }, // Ommit rating on purpose
      { "rating": 3, "sector": "Dogpatch", "type": "Boulder" },
      { "rating": 4, "sector": "Dogpatch", "type": "Boulder" },
      { "rating": 2, "sector": "Jailhouse", "type": "Sport lead" },
      { "rating": 5, "sector": "Jailhouse", "type": "Sport lead" },
      { "rating": 1, "sector": "Jailhouse", "type": "Sport lead" }
    ]
    prepareDirective(routes)

    expect(element.find('circle').length).toBe(3)
  })

  it('should let you chain the configuration', function() {
    var routes = []
    prepareDirective(routes)

    var chart = element.isolateScope().getScatterPlot()
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
      { "rating": 4, "sector": "Jailhouse", "type": "Sport lead" }
    ]
    scope.$digest()

    expect(element.find('circle').length).toBe(1)
  })
})
