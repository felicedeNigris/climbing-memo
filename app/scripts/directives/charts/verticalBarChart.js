'user strict'

angular.module('climbingMemo')
.directive('verticalBarChart', function(verticalBarChartSvc, utilsChartSvc) {
  // Private 5 digit chart ID
  var ID = _.random(10000, 99999)

  return {
    scope: {
      routes: '='
    },
    restrict: 'E',
    template: '<div id="chart-' + ID + '"></div>',
    link: function(scope, element, attrs) {

      // Draw chart when routes change
      scope.$watch('routes', function(rawData) {
        rawData = rawData || []

        var chart = scope.getVerticalBar()
        .data(verticalBarChartSvc.processData(rawData))
        .width(element.parent().width())
        .height(300)

        d3.select('#chart-' + ID).call(chart)
      })

      /**
      * Create and return a Vertical Bar chart
      * created using D3.js
      *
      * @return {Function} Callable object to create chart
      */
      scope.getVerticalBar = function() {

        var data = []
        var width = 800
        var height = 600

        /* istanbul ignore next */
        function my(container) {


          var margin = {top: 20, right: 20, bottom: 55, left: 30},
          widthChart = width - margin.left - margin.right,
          heightChart = height - margin.top - margin.bottom

          var xScale = d3.scale.ordinal()
          .rangeRoundBands([0, widthChart], 0.1)

          var yScale = d3.scale.linear()
          .rangeRound([heightChart, 0])

          var formatMonth = function(value) {
            var month = []
            month[1] = "Jan"; month[2] = "Feb"
            month[3] = "Mar"; month[4] = "Apr"
            month[5] = "May"; month[6] = "Jun"
            month[7] = "Jul"; month[8] = "Aug"
            month[9] = "Sep"; month[10] = "Oct"
            month[11] = "Nov";month[12] = "Dec"

            return month[parseInt(value)]
          }

          var xAxis = d3.svg.axis()
          .scale(xScale)
          .orient("bottom")

          var yAxis = d3.svg.axis()
          .scale(yScale)
          .orient("left")
          .tickFormat(d3.format("d"))

          //REMOVE SVG
          container.select("svg").remove()

          // CREATE NEW SVG
          var svg = container.append("svg")
          .attr("width", width)
          .attr("height", height)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

          var tip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            var html = ''
            html += '<span style="color:' + utilsChartSvc.typeColor(d.name) + '">'
            html += d.name + "</span> "
            html += " : <span style='color:red'>" + d.sum + "</span>"
            return html
          })

          svg.call(tip)


          // Create Domains
          var maxRoutes = 0
          var i

          for (i = 0 ; i < data.length ; i++) {
            var month = data[i]

            var totalRoutes = 0
            for (var j = 0 ; j < month.type.length ; j++) {
              totalRoutes += month.type[j].sum
            }
            maxRoutes = Math.max(maxRoutes,totalRoutes)
          }

          var currentDate = new Date()
          var xDomain = []

          for (i = 0 ; i < 12 ; i++) {
            var string = String(currentDate.getMonth() + 1) + String(currentDate.getFullYear())
            string = currentDate.getMonth() < 9 ? '0' + string : string
            xDomain.push(string)
            currentDate.setMonth(currentDate.getMonth() - 1)
          }


          xScale.domain(xDomain.reverse())
          yScale.domain([0, maxRoutes])

          svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + heightChart + ")")
          .call(xAxis)
          .selectAll("text")
          .style("text-anchor", "end")
          .attr("dx", "-.8em")
          .attr("dy", ".15em")
          .attr("transform", "rotate(-65)")
          .text(function(d) {
            var month = d.substr(0,2)
            var year = d.substr(4,6)
            return formatMonth(month) + '-' + year
          })

          svg.append("g")
          .attr("class", "y axis")
          .call(yAxis)
          .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Climbs")

          var barsX = svg.selectAll(".date")
          .data(data)
          .enter().append("g")
          .attr("class", "g")
          .attr("transform", function(d) {
            return "translate(" + xScale(d.date) + ",0)"
          })

          barsX.selectAll("rect")
          .data(function(d) { return d.type })
          .enter().append("rect")
          .attr("width", xScale.rangeBand())
          .attr("y", function(d) { return yScale(d.y1); })
          .attr("height", function(d) { return yScale(d.y0) - yScale(d.y1); })
          .style("fill", function(d) { return utilsChartSvc.typeColor(d.name) })
          .on("mouseover", function(d) {
            $(this).css({'opacity':0.8})
            tip.show(d)
          })
          .on("mouseout", function(d) {
            $(this).css({'opacity':1})
            tip.hide(d)
          })

          svg.selectAll('.axis line, .axis path')
          .style({
            'stroke': 'Black',
            'fill': 'none',
            'stroke-width': '1px',
            'shape-rendering':'crispEdges'
          })


          return my
        }

        my.data = function(value) {
          if (!arguments.length) {
            return data
          }
          data = value
          return my
        }

        my.width = function(value) {
          if (!arguments.length) {
            return width
          }
          width = value
          return my
        }

        my.height = function(value) {
          if (!arguments.length) {
            return height
          }
          height = value
          return my
        }
        return my
      }
    }
  }
})
