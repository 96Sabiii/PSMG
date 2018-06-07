/* eslint-env browser */
/* global EventPublisher */
// based on: https://bost.ocks.org/mike/bar/

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpActionsView = function() {
    "use strict";
    var that = new EventPublisher();

    function createChart(){
        var chart = document.getElementById("myChart");
        chart.style.height = "800";
        chart.style.width = "800";
    }
    
    function createSVG(root) {
        //SVG erstellen
        var selection = d3.select("#myChart"),
            g = selection.append("g").attr("transform", "translate(2,2)"),
            colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
        var nodes = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
          .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        var circles = nodes.append("circle").attr("r", function(d) {return d.r })
            .style("fill", function(d) {return colorCircles(d.value)} );
        var labels = nodes.append("text").text(function(d) {return d.data.name });
    }


    that.createChart = createChart;
    that.createSVG = createSVG;
    return that;

};
