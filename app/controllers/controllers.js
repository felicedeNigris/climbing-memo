
app.controller ('GeneralController', function ($scope) {
	var dropZone = document.getElementById("drop-zone");
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);


	$scope.routes = [
		{name: "Moroni", grade:'5.13a', rating: 3, setter: 'FLEA', status: 'redpoint', rock: 'gym', location: 'IW'},
		{name: "Moroni", grade:'5.13a', rating: 3, setter: 'FLEA', status: 'redpoint', rock: 'gym', location: 'IW'},
	];
});
