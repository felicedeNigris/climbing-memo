'user strict'

angular.module('climbingMemo')
.directive('overviewChart', function(overviewChartSvc, utilsChartSvc) {
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
      scope.$watch('routes', function(data) {
        data = data || []

        var chart = scope.getCalendarHeatmap()
        .data(overviewChartSvc.processData(data))
        .cellSize(13)

        d3.select('#chart-' + ID).call(chart)
      })

      /**
      * Create and return a Calendar Heatmap chart
      * created using D3.js
      *
      * @return {Function} Callable object to create chart
      */
      scope.getCalendarHeatmap = function() {

        // Default values
        var data = []
        var cellSize = 13

        function my(container) {

          // Process data
          var day = d3.time.format("%w"),
          week = d3.time.format("%U"),
          format = d3.time.format("%m/%d/%Y")

          var color = function(ease) {
            var color = '#839ee2'
            switch (ease) {
              case 0: case 1: color = '#3460cf'
                break
              case 2: case 3: color = '#446cd3'
                break
              case 4:	case 5: color = '#5479d7'
                break
              case 6:	case 7: color = '#6485da'
                break
              case 8:	case 9: color = '#7392de'
                break
            }
            return color
          }

          container.select("svg").remove()

          var endDate = new Date()
          var startDate = new Date(
            endDate.getFullYear() - 1,
            endDate.getMonth(),
            endDate.getDate() + 1
          )

          var width = 54 * cellSize + 10
          var height = cellSize * 8 + 10

          var svg = container.append("svg")
          .data([1])
          .attr("width", width)
          .attr("height", height)
          .attr("class", "RdYlGn")
          .append("g")

          svg.append("text")
          .attr("transform", "translate(-6," + cellSize * 3.5 + ")rotate(-90)")
          .style("text-anchor", "middle")
          .text(function(d) { return d; })

          var tip= d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(d) {
            var metric = data[d].metrics[0]
            var html = ''
            html += '<span style="color:' + utilsChartSvc.typeColor(metric.type) + '">'
            html += metric.type + "</span> "
            html += metric.grade + ' ' + metric.status
            html +=" <span style='color:gray'>" + d + "</span>"
            return html
          })

          svg.call(tip)

          var rect = svg.selectAll(".emptyDay")
          .data(function(d) { return d3.time.days(startDate, endDate); })
          .enter().append("rect")
          .attr("class", "emptyDay")
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("x", function(d) {

            var dist = (endDate.getFullYear() === d.getFullYear()) ?
            1 + parseInt(week(endDate)) - parseInt(week(d)) :
            53 - parseInt(week(d)) + parseInt(week(endDate))

            return (53 - dist) * cellSize
          })
          .attr("y", function(d) { return day(d) * cellSize; })
          .datum(format)

          rect.filter(function(d) { return d in data; })
          .attr("class", "climbDay")
          .style('fill', function(d) {
            var ease = parseInt(data[d].metrics[0].ease * 10)
            return color(ease)
          })
          .on("mouseover", function(d) {
            $(this).css({'opacity':0.8})
            tip.show(d)
          })
          .on("mouseout", function(d) {
            $(this).css({'opacity':1})
            tip.hide(d)
          })


          function applyStyle() {
            svg.selectAll('.emptyDay').style({
              'fill': '#fff',
              'stroke': '#ccc'
            })

            svg.selectAll('rect').style({
              'shape-rendering': 'crispEdges'
            })

            svg.selectAll('text').style({
              'font': '12px sans-serif',
              'fill': 'gray'
            })
          }

          function createLegend() {
            svg.append("text")
            .attr("transform", "translate(0," + (2 + cellSize * 8) + ")")
            .text('Summary of climbs over the last year')

            // Difficulty legend
            var xPos = 490
            svg.append("text")
            .attr("transform", "translate(" + xPos + "," + (2 + cellSize * 8) + ")")
            .text('Difficulty: Less')

            var legendDays = [10,8,6,4,2,1]
            var rect = svg.selectAll(".legendDay")
            .data(legendDays)
            .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) {
              var numRect = legendDays.indexOf(d)
              return xPos + 80 + cellSize * numRect + numRect * 2
            })
            .attr("y",  cellSize * 8 - 8)
            .style("fill", function(d) {
              return color(d)
            })

            svg.append("text")
            .attr("transform", "translate(" + (xPos + cellSize * 6 + 93) +
              "," + (2 + cellSize * 8) + ")")
            .text('more')
          }

          createLegend()
          applyStyle()

        }

        my.data = function(value) {
          if (!arguments.length) {
            return data
          }
          data = value
          return my
        }

        my.cellSize = function(value) {
          if (!arguments.length) {
            return cellSize
          }
          cellSize = value
          return my
        }

        return my
      }
    }
  }
})
