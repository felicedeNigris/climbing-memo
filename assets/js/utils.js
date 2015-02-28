
/**
 * Create array of uniq strings sorted by frequency
 *
 * @method arrayGroupBy
 * @param {Array} array of objects
 * @param {String} property name 
 *
 * @return {Array} Grouped array
 */
function arrayGroupBy (data,field) {
	var seen = {};
	var frequency = {};

	return data
	.map ( function (group) {
		if (group.hasOwnProperty(field)){
			
			var value = group[field];
			if (!frequency.hasOwnProperty(value))
				frequency[value] = 0;
			frequency[value] += 1;
			
			return value;
		}
	})
	.sort(function (a,b) { return frequency[a] < frequency[b] })
	.filter(function(n) { 
		return seen.hasOwnProperty(n) || n === undefined ? false : (seen[n] = true)
	});
}

function arrayToHashtable (data,field) {
	var hashtable = [];

	for (var i=0 ; i < data.length ; i++){
		var index = data[i][field];

		if (typeof hashtable[index] === 'undefined')
			hashtable[index] = [];

		hashtable[index].push(data[i]);
	}

	return hashtable;
}
