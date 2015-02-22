
app.controller ('GeneralController', function ($scope) {
	var dropZone = document.getElementById("drop-zone");
	dropZone.addEventListener('dragover', handleDragOver, false);
	dropZone.addEventListener('drop', handleFileSelect, false);
});
