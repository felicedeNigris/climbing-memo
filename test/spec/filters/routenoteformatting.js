'use strict'

describe('Filter: routeNoteFormatting', function() {

  // load the filter's module
  beforeEach(module('climbingMemo'))

  // initialize a new instance of the filter before each test
  var routeNoteFormatting
  beforeEach(inject(function($filter) {
    routeNoteFormatting = $filter('routeNoteFormatting')
  }))

  it('should return a default text when empty"routeNoteFormatting filter:"', function() {
    var text = ''
    expect(routeNoteFormatting(text).length).toBeGreaterThan(1)
  })

  it('should return the actual note when exisiting', function() {
    var text = 'Hello world!'
    expect(routeNoteFormatting(text)).toBe(text)
  })
})
