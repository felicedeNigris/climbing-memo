
var app = angular.module('climbingMemo', ['ngRoute','firebase','ui.bootstrap','hc.marked']);

app.config (function ($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: 'GeneralController',
			templateUrl: 'app/partials/general.html'
		});
});

app.constant('FIREBASE_URL', 'https://dazzling-heat-1886.firebaseio.com');
