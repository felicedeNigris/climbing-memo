'use strict'

describe('Directive: sectorsMetrics', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, modal, httpBackend, templateCache

  beforeEach(function() {
    module('climbingMemo', function($controllerProvider) {
      $controllerProvider.register('ModalsliderCtrl', function($scope) {
        // Controller Mock
      })
    })
  })

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should #openRouteModal', inject(function($compile) {
    httpBackend.whenGET('views/_sectorsMetrics.html')
      .respond(templateCache.get('/views/_sectorsMetrics.html'))

    element = angular.element('<sectors-metrics metrics="[{}]"></sectors-metrics>')
    element = $compile(element)(scope)
    httpBackend.flush()

    httpBackend.expectGET('views/sliderModal.html')
    httpBackend.whenGET('views/sliderModal.html')
      .respond(templateCache.get('/views/sliderModal.html'))
    element.find('a').click()

    httpBackend.flush()
  }))
})
