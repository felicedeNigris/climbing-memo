'use strict'

describe('Directive: routesPagination', function() {

  var rootScope, element, scope, httpBackend, compile, templateCache

  // load the directive's module
  beforeEach(module('climbingMemo'))
  beforeEach(module('templates'))

  beforeEach(inject(function($rootScope, $compile, $httpBackend, $templateCache) {
    httpBackend = $httpBackend
    templateCache = $templateCache
    rootScope = $rootScope
    compile = $compile
  }))

  var prepareDirective = function(attributes) {
    var view = 'views/_routesPagination.html'
    httpBackend.whenGET(view).respond(templateCache.get('/' + view))

    scope = rootScope.$new()
    scope.routes = attributes.routes
    scope.itemsPerPage= attributes.itemsPerPage

    scope.$on('routesTableVisibility', function(event, visibleRoutes) {
      expect(visibleRoutes.length).toBe(scope.itemsPerPage)
    })

    element = angular.element(
      '<routes-pagination routes="routes" items-per-page="itemsPerPage"></routes-pagination>'
    )
    element = compile(element)(scope)

    httpBackend.flush()
  }

  it('should create pagination based on route length', function() {
    prepareDirective({
      itemsPerPage: 10,
      routes: _.fill(new Array(20),{id: 1})
    })

    expect(element.find('li').length).toBe(6)
  })

  it('should be maximum of 3 pagination list size', function() {
    prepareDirective({
      itemsPerPage: 3,
      routes: _.fill(new Array(50),{id: 1})
    })

    expect(element.find('li').length).toBe(7)
  })
})
