'use strict'

describe('Directive: headerOverview', function() {

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  var element, scope, modal, httpBackend, templateCache

  beforeEach(function() {
    module('climbingMemo', function($provide) {
      $provide.factory('routesSvc', function($q) {
        return {
          getRoutes: function() {
           var deferred = $q.defer()
           deferred.resolve([])
           return deferred.promise
          }
        }
      })
    })
  })

  beforeEach(inject(function($rootScope, $httpBackend, $templateCache) {
    scope = $rootScope.$new()
    httpBackend = $httpBackend
    templateCache = $templateCache
  }))

  it('should get #templateUrl', inject(function($compile) {
    httpBackend.expectGET('views/_headerOverview.html')
    httpBackend.whenGET('views/_headerOverview.html')
      .respond(templateCache.get('/views/_headerOverview.html'))

    element = $compile('<header-overview></header-overview>')(scope)

    httpBackend.flush()
  }))
})
