/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpActionsView = function() {
  "use strict";
  var that = new EventPublisher();

  function bubbleChart(){
    console.log("bubblechart");
    d3.csv("C:/Users/cip/Documents/GitHub/PSMG/res/assets/data/elements-by-episode.csv", function(data) {
    let radius = 0,
    lastRadius;
      var selection = d3.select("#myChart");
      console.log(data);
      var groups = selection.selectAll('g').data(data.columns).enter().append('g').append("circle")
      .attr("r", function(c) { return  d3.sum(data, function(d) { return lastRadius = d[c]; }); })
      .attr("cx", function(d) { return radius =+ lastRadius })
      .attr("cy", "200px")
      .style("fill", function() { return "hsl(" + Math.random() * 360 + ",100%,50%)"; });
    });
  }

  that.bubbleChart = bubbleChart;
  return that;

};
