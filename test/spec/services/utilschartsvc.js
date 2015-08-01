'use strict'

describe('Service: utilsChartSvc', function() {

  // load the service's module
  beforeEach(module('climbingMemo'))

  // instantiate service
  var utilsChartSvc
  beforeEach(inject(function(_utilsChartSvc_) {
    utilsChartSvc = _utilsChartSvc_
  }))

	describe('#arrayToHashtable(data,field)', function() {
		it('should create an array indexed by a property', function() {

			var itemA = {name:'NameA',location:'locationA'}
			var itemB = {name:'NameB',location:'locationB'}
			var itemC = {name:'NameC',location:'locationB'}

			var inputArray = []
			inputArray.push(itemA,itemB,itemC)

			var outputArray = []
			outputArray.locationA = [itemA]
			outputArray.locationB = [itemB,itemC]

			expect(_.isEqual(outputArray, utilsChartSvc.arrayToHashtable(inputArray,'location'))).toBe(true)
		})
	})

	describe('#compareRouteGrade(a,b)', function() {
		it('should return true if grade a greater than b', function() {

			var inputA = '5.8'
			var inputB = '5.10a'
			var inputC = '5.10b'

			expect(utilsChartSvc.compareRouteGrade(inputA,inputB)).toBe(false)
			expect(utilsChartSvc.compareRouteGrade(inputB,inputA)).toBe(true)
			expect(utilsChartSvc.compareRouteGrade(inputC,inputB)).toBe(true)
		})
	})

	describe('#arrayGroupBy(data,field)', function() {
		it('should create an array of uniq strings sorted by frequency', function() {

			var itemA = {name:'NameA',location:'locationA'}
			var itemB = {name:'NameB',location:'locationB'}
			var itemC = {name:'NameC',location:'locationB'}
			var itemD = {name:'NameD'}

			var inputArray = []
			inputArray.push(itemA,itemB,itemC,itemD)

			var outputArray = ['locationA','locationB']

			expect(_.isEqual(outputArray, utilsChartSvc.arrayGroupBy(inputArray,'location'))).toBe(true)
		})
	})
})
