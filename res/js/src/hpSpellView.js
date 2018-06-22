/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpSpellView = function() {
  "use strict";
  var that = new EventPublisher(),
      div;

  function createSpellChart(){
      var chart = document.getElementById("Chart2");
      chart.style.height = "800";
      chart.style.width = "800";

      // Define the div for the tooltip
      div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
  }

          function createSpellSVG(root) {
              //SVG erstellen
              var selection = d3.select("#Chart2"),
                  g = selection.append("g").attr("transform", "translate(2,2)"),
                  colorCircles = d3.scaleOrdinal(d3.schemeCategory20);

              var nodes = g.selectAll(".node")
              .data(root.descendants().slice(1))
              .enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                //hier bubble anpassungen
              nodes.append("circle").attr("r", function(d) {return d.r })
                  .style("fill", function(d) {return colorCircles(d.value)} )
                      .on("mouseover", function(d) {
                      d3.select(this).style("stroke-width", 3).style("stroke", "black");
                      div.transition()
                          .duration(200)
                          .style("opacity", .9);
                      div	.html("<b>" + d.data.name + "</b>: <br/> <br/>"  + d.data.effect)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                      })
                      .on("mouseout", function(d) {
                          d3.select(this).style("stroke", "none");
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);
              });

              nodes.append("text").style("text-anchor", "middle").text(function(d) {return d.data.name });

  }

  that.createSpellChart = createSpellChart;
  that.createSpellSVG = createSpellSVG;
  return that;

};
