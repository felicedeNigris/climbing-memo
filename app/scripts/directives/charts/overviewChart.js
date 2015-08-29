'user strict'

angular.module('climbingMemo')
.directive('overviewChart', function(overviewChartSvc, $modal, utilsChartSvc) {
  // Private 5 digit chart ID
  var ID = _.random(10000, 99999)

  return {
    scope: {
      routes: '='
    },
    restrict: 'E',
    template: '<div id="chart-' + ID + '"></div>',
    link: function(scope, element, attrs) {

      function initDirective() {
        scope.renderChart(scope.routes)
      }

      // Draw chart when routes change
      scope.$watch('routes', function(rawData) {
        scope.renderChart(rawData)
      })

      /**
      * Open a modal to display routes card
      *
      * @method openSliderModal
      */
      scope.openSliderModal = function(routesId) {
        $modal.open({
          templateUrl: 'views/sliderModal.html',
          controller: 'ModalsliderCtrl',
          size: 'lg',
          resolve: {
            routesId: function() {
              return routesId
            }
          }
        })
      }

      /**
      * @method renderChart
      * Create the chart in the template div
      *
      * @param {Array} rawData
      */
      scope.renderChart = function(rawData) {
        rawData = rawData || []

        var chart = scope.getCalendarHeatmap()
        .data(overviewChartSvc.processData(rawData))
        .cellSize(13)

        d3.select(element.find('#chart-' + ID)[0]).call(chart)
      }

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

          // Route tip (on heatmap)
          var routeTip = d3.tip()
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

          svg.call(routeTip)

          // legeng tip (climbing type)
          var legendTip = d3.tip()
          .attr('class', 'd3-tip')
          .offset([-10, 0])
          .html(function(type) {
            return '<span style="color:' + utilsChartSvc.typeColor(type) + '">' + type + '</span>'
          })

          svg.call(legendTip)

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
            return utilsChartSvc.typeColor(data[d].metrics[0].type)
          })
          .style('cursor', 'pointer')
          .on('click', function(d) {
            scope.openSliderModal(_.pluck(data[d].metrics, 'id'))
          })
          .on("mouseover", function(d) {
            $(this).css({'opacity':0.8})
            routeTip.show(d)
          })
          .on("mouseout", function(d) {
            $(this).css({'opacity':1})
            routeTip.hide(d)
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
            var xPos = 515
            svg.append("text")
            .attr("transform", "translate(" + xPos + "," + (2 + cellSize * 8) + ")")
            .text('Types of climbs')

            var legendDays = [
              'Sport lead',
              'Boulder',
              'Traditional',
              'Multi-pitch',
              'Top rope'
            ]
            var rect = svg.selectAll(".legendDay")
            .data(legendDays)
            .enter().append("rect")
            .attr("width", cellSize)
            .attr("height", cellSize)
            .attr("x", function(d) {
              var numRect = legendDays.indexOf(d)
              return xPos + 90 + cellSize * numRect + numRect * 2
            })
            .attr("y",  cellSize * 8 - 8)
            .style("fill", function(d) {
              return utilsChartSvc.typeColor(d)
            })
            .on("mouseover", function(d) {
              $(this).css({'opacity':0.8})
              legendTip.show(d)
            })
            .on("mouseout", function(d) {
              $(this).css({'opacity':1})
              legendTip.hide(d)
            })
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

      initDirective()
    }
  }
})
