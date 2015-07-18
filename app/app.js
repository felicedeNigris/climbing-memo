'use strict'

angular.module('climbingMemo', ['ngRoute','ui.bootstrap','hc.marked', 'jlareau.pnotify'])

angular.module('climbingMemo')
.config(function($routeProvider) {
	$routeProvider
	.when('/',
		{
			controller: 'GeneralController',
			templateUrl: 'app/views/general.html'
		})
})

angular.module('climbingMemo')
.constant('DATABASE_URL', 'https://dazzling-heat-1886.firebaseio.com/')
