'use strict'

describe('Controller: navbarCtrl', function() {

  // load the controller's module
  beforeEach(module('climbingMemo'))

  /**
  * Initialize local variables for unit-test
  */
  var navbarCtrl, scope, location, rootScope, deferred, utilsRouteSvc,
  localStorage

  // Initialize the controller and a mock scope
  beforeEach(inject(function($controller, $rootScope, $q) {
    scope = $rootScope.$new()

    // rootScope stub
    rootScope = $rootScope
    spyOn(rootScope, '$broadcast')

    // Location stub
    location = {
      path:  function() {}
    }
    spyOn(location, 'path').and.returnValue('/test')

    // localStorage stub
    localStorage = {
      routes: {
        testA: {sync: true},
        testB: {sync: true}
      }
    }

    // utilsRouteSvc Stub
    utilsRouteSvc = {
      getRoutes:       function() {}
    }
    deferred = $q.defer()
    spyOn(utilsRouteSvc, 'getRoutes').and.returnValue(deferred.promise)

    navbarCtrl = $controller('navbarCtrl', {
      $scope:    scope,
      $location:  location,
      $localStorage: localStorage,
      utilsRouteSvc: utilsRouteSvc
    })
  }))

  it('should detect #isActive based on location', function() {
    var output

    output = scope.isActive('/test')
    expect(output).toBe(true)
    output = scope.isActive('/error')
    expect(output).toBe(false)
  })

  it('should refresh routes on #getBucket success', function() {
    scope.getBucket()
    deferred.resolve()
    rootScope.$apply()

    expect(rootScope.bucket).toMatch('demo')
    expect(localStorage.bucket).toMatch('demo')
    expect(rootScope.$broadcast).toHaveBeenCalledWith('routesUpdated')
  })

  it('should revert bucket on #getBucket error', function() {
    rootScope.bucket = 'test'
    scope.getBucket()
    deferred.reject()
    rootScope.$apply()

    expect(rootScope.bucket).toMatch('test')
    expect(scope.bucketName).toMatch('test')
  })
})
