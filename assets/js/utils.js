
function isRoute (object) {
	return typeof object === 'object' && object && object.hasOwnProperty('id');
};

function groupBy (object,field) {
	var seen = {};
	return Object.keys(object).map ( function (group) {
		if (typeof object[group] === 'object' &&
			object[group] &&
			object[group].hasOwnProperty(field))
			return object[group][field];
	}).filter(function(n) { 
		return seen.hasOwnProperty(n) || n === undefined ? false : (seen[n] = true)
	});
};

