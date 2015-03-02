var assert = require("assert"); // node.js core module
var heatmap = require("../assets/js/charts/calendar_heatmap_helper.js").calendarHeatmapHelper;
var map = require("../assets/js/charts/map_helper.js").mapHelper;

describe('Climbing Charts', function(){

	describe('#getMapChartData(data)', function(){
		it('pre-process data for Map', function(){

			var itemA= {location:'locationA',type:'typeA',latitude:'latA',longitude:'longA'};
			var itemB= {location:'locationB',type:'typeB',latitude:'latB',longitude:'longB'};
			var itemC= {location:'locationA',type:'typeA',latitude:'latA',longitude:'longA'};
			var itemD= {location:'locationB',type:'typeC',latitude:'latB',longitude:'longB'};

			var inputArray = [];
			inputArray.push(itemA,itemB,itemC,itemD);

			var outputArray = [];
			outputArray.push({
				name:'locationA',
				latitude:'latA',
				longitude:'latA',
				metrics: [
					{type:'typeA',count:2}
				]
			});
			outputArray.push({
				name:'locationB',
				latitude:'latB',
				longitude:'latB',
				metrics: [
					{type:'typeB',count:1},
					{type:'typeC',count:1}
				]
			});

		})
	});

});
