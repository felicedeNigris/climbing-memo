'use strict'

describe('Directive: sliderCharts', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))

  var element,
    scope

  beforeEach(inject(function($rootScope) {
    scope = $rootScope.$new()
  }))

  // it('should make hidden element visible', inject(function($compile) {
  //   element = angular.element('<slider-charts></slider-charts>')
  //   element = $compile(element)(scope)
  // }))
})
