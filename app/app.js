
var app = angular.module('climbingMemo', ['ngRoute']);

app.config (function ($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: 'GeneralController',
			templateUrl: 'app/partials/general.html'
		});
});

