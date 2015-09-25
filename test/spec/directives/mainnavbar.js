'use strict'

describe('Directive: mainNavbar', function() {

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
    httpBackend.expectGET('views/_mainNavbar.html')
    httpBackend.whenGET('views/_mainNavbar.html')
      .respond(templateCache.get('/views/_mainNavbar.html'))

    element = $compile('<main-navbar></main-navbar>')(scope)

    httpBackend.flush()
  }))
})
