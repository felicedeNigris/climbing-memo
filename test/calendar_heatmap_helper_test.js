var assert = require("assert"); // node.js core module
var utils = require("../assets/js/utils.js").utils; // assets utils

describe('Climbing Utils', function(){

	describe('#arrayToHashtable(data,field)', function(){
		it('should create an array indexed by a property', function(){

			var itemA = {name:'NameA',location:'locationA'};
			var itemB = {name:'NameB',location:'locationB'};
			var itemC = {name:'NameC',location:'locationB'};

			var inputArray = [];
			inputArray.push(itemA,itemB,itemC);

			var outputArray = [];
			outputArray['locationA'] = [itemA];
			outputArray['locationB'] = [itemB,itemC];

			assert.deepEqual(outputArray, utils.arrayToHashtable(inputArray,'location'));
		})
	});

	describe('#compareRouteGrade(a,b)', function(){
		it('should return true if grade a greater than b', function(){

			var inputA = '5.8';
			var inputB = '5.10a';

			assert.equal(false, utils.compareRouteGrade(inputA,inputB));
			assert.equal(true, utils.compareRouteGrade(inputB,inputA));
		})
	});

	describe('#arrayGroupBy(data,field)', function(){
		it('should create an array of uniq strings sorted by frequency', function(){

			var itemA = {name:'NameA',location:'locationA'};
			var itemB = {name:'NameB',location:'locationB'};
			var itemC = {name:'NameC',location:'locationB'};
			var itemD = {name:'NameD'};

			var inputArray = [];
			inputArray.push(itemA,itemB,itemC,itemD);

			var outputArray = ['locationB','locationA'];

			assert.deepEqual(outputArray, utils.arrayGroupBy(inputArray,'location'));
		})
	});
});
