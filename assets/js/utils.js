
function arrayGroupBy (data,field) {
	var seen = {};
	return data.map ( function (group) {
		if (group.hasOwnProperty(field))
			return group[field];
	}).filter(function(n) { 
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
