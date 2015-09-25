'use strict'

describe('Directive: sliderCharts', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, modal, httpBackend, templateCache, timeout

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache, $timeout) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
    timeout = $timeout
  }))

  it('should compile charts when #renderChart', inject(function($compile) {
    httpBackend.whenGET('views/_sliderCharts.html')
      .respond(templateCache.get('/views/_sliderCharts.html'))

    element = angular.element('<slider-charts></slider-charts>')
    element = $compile(element)(scope)

    httpBackend.flush()

    var elementScope = element.isolateScope()

    expect(elementScope.currentSlideType.length).toBeGreaterThan(0)
    timeout.flush()
    expect(elementScope.width).toBeDefined()
  }))
})
