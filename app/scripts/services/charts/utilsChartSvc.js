'use strict'

angular.module('climbingMemo')
.service('utilsChartSvc', function utilsChartSvc() {
  /**
   * Create array of uniq strings sorted by frequency
   *
   * @method arrayGroupBy
   * @param {Array} array of objects
   * @param {String} property name
   *
   * @return {Array} Grouped array
   */
  this.arrayGroupBy =function(data,field) {
    var seen = {}
    var frequency = {}

    return data
    .map(function(group) {
      if (group.hasOwnProperty(field)) {

        var value = group[field]
        if (!frequency.hasOwnProperty(value)) {
          frequency[value] = 0
        }
        frequency[value] += 1

        return value
      }
    })
    .sort(function(a,b) { return frequency[a] < frequency[b] })
    .filter(function(n) {
      return seen.hasOwnProperty(n) || n === undefined ? false : (seen[n] = true)
    })
  }

  /**
   * Return svg color based on Route type
   *
   * @method typeColor
   * @param {String} Route type
   *
   * @return {String} Svg color
   */
  this.typeColor = function(type) {
    switch (type) {
      case 'Sport lead':	return 'gold'
      case 'Boulder':		return 'lightskyblue'
      case 'Traditional':	return 'yellowgreen'
      case 'Multi-pitch':	return 'darkorange'
      case 'Top rope':	return 'lightgray'
      default:			return 'lightgray'
    }
  }


  /**
   * Create an array Hashtable of an object for a specific property name
   *
   * @method arrayToHashtable
   * @param {Array} array of objects
   * @param {String} property name
   *
   * @return {Array} Array indexed by property
   */
  this.arrayToHashtable = function(data,field) {
    var hashtable = []

    for (var i=0 ; i < data.length ; i++) {
      var index = data[i][field]

      if (typeof hashtable[index] === 'undefined') {
        hashtable[index] = []
      }

      hashtable[index].push(data[i])
    }

    return hashtable
  }

  /**
   * Comapre grade between two routes
   *
   * @method compareRouteGrade
   * @param {String} grade a
   * @param {String} grade b
   *
   * @return {Boolean} TRUE if grade a greater than b
   */
  this.compareRouteGrade = function(a,b) {
    // Compare route grade with digit & char
    var intA = parseInt(a.replace(/\D/g, ''))
    var intB = parseInt(b.replace(/\D/g, ''))
    var charA = a.replace(/[0-9]/g,'').toLowerCase()
    var charB = b.replace(/[0-9]/g,'').toLowerCase()

    return intA > intB || (intA === intB && charA > charB)
  }
})
