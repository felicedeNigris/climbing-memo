'use strict'

/**
* @ngdoc filter
* @name climbingMemo.filter:routeNoteFormatting
* @function
* @description
* # routeNoteFormatting
* Filter in the climbingMemo.
*/
angular.module('climbingMemo')
.filter('routeNoteFormatting', function() {
  return function(input) {
    return input ? input : '```\nReminder:\n```\n\n**Description**\n\n> \n\n----\n**' +
      'Protection**\n\n> \n\n----\n**Location**\n\n> \n\n----'
  }
})
