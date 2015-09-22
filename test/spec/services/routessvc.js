'use strict'

describe('Service: routesSvc', function() {
  beforeEach(module('climbingMemo'))
  beforeEach(angular.mock.module('climbingMemo'))

  beforeEach(angular.mock.module('climbingMemo', function($provide) {
    $provide.constant('DATABASE_URL', 'test.mock/')
  }))

  var myService, httpBackend
  beforeEach(inject(function(routesSvc, _$httpBackend_) {
    myService = routesSvc
    httpBackend = _$httpBackend_
  }))

  it('should GET /routes', function() {
    httpBackend.expectGET('test.mock/demo/routes.json').respond({ test: true })

    myService.getRoutes().then(function(result) {
      expect(result.data).toEqual({ test: true })
    })
    httpBackend.flush()
  })

  it('should GET /routes/:id', function() {
    var id = 'myTestId'
    httpBackend.expectGET('test.mock/demo/routes/myTestId.json').respond({ test: true })

    myService.getRoute(id).then(function(result) {
      expect(result.data).toEqual({ test: true })
    })
    httpBackend.flush()
  })

  it('should add route POST /routes', function() {
    var route = { name: 'test' }
    httpBackend.expectPOST('test.mock/demo/routes/.json', {
      name: 'test'
    }).respond(true)

    myService.addRoute(route).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })

  it('should clean route before adding and updating it', function() {
    var id = 'myTestId'
    var route = {
      name:      'test',
      '$testA':  true,
      '$testB':  true
    }
    httpBackend.expectPOST('test.mock/demo/routes/.json', {
      json: { name: 'test' },
      test: function(data) {
        return _.isEqual(JSON.parse(data), { name: 'test' })
      }
    }).respond(true)
    httpBackend.expectPATCH('test.mock/demo/routes/myTestId.json', {
      json: { name: 'test' },
      test: function(data) {
        return _.isEqual(JSON.parse(data), { name: 'test' })
      }
    }).respond(true)

    myService.addRoute(route).then(function(result) {
      expect(result.data).toEqual(true)
    })
    myService.updateRoute(route, id).then(function(result) {
      expect(result.data).toEqual(true)
    })

    httpBackend.flush()
  })

  it('should delete route DELETE /routes/:id', function() {
    var id = 'myTestId'
    httpBackend.expectDELETE('test.mock/demo/routes/myTestId.json').respond(true)

    myService.deleteRoute(id).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })

  it('should clean route before updating it', function() {
  })

  it('should update route PATCH /routes/:id', function() {
    var id = 'myTestId'
    var route = { name: 'test' }

    httpBackend.expectPATCH('test.mock/demo/routes/myTestId.json', {name: 'test'}).respond(true)

    myService.updateRoute(route, id).then(function(result) {
      expect(result.data).toEqual(true)
    })
    httpBackend.flush()
  })
})
