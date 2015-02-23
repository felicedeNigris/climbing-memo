
var app = angular.module('climbingMemo', ['ngRoute','ngTable','firebase']);

app.config (function ($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: 'GeneralController',
			templateUrl: 'app/partials/general.html'
		});
});

app.constant('FIREBASE_URL', 'https://dazzling-heat-1886.firebaseio.com');
