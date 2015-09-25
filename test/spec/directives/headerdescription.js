'use strict'

describe('Directive: headerDescription', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, modal, httpBackend, templateCache

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should get #templateUrl', inject(function($compile) {
    httpBackend.expectGET('views/_headerDescription.html')
    httpBackend.whenGET('views/_headerDescription.html')
      .respond(templateCache.get('/views/_headerDescription.html'))

    element = $compile('<header-description></header-description>')(scope)

    httpBackend.flush()
  }))
})
