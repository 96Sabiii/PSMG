/* eslint-env browser */
/* global EventPublisher */
// based on: https://bost.ocks.org/mike/bar/

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpActionsView = function() {
    "use strict";
    var that = new EventPublisher(),
        div,
        size=1250;

    function createActionsChart(){
        var chart = d3.select('#Chart1');

        // Define the div for the tooltip
        div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
    }

    function createActionsSVG(root) {
        var pack = d3.pack()
            .size([size, size])
            .padding(1.5);
        
        //SVG erstellen
        var selection = d3.select("#Chart1"),
            colorCircles =d3.scaleSequential()
                .domain([75, 100])
                .interpolator(d3.interpolateRainbow);

        var nodes = selection.selectAll(".node")
        .data(pack(root).leaves())
        .enter().append("g")
          .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
          .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

        nodes.append("circle")
          .style("stroke-width", 2).style("stroke", " #aeb4bf")
        .attr("r", function(d) {return d.r })
            .style("fill", function(d) {return colorCircles(d.value)} )
                .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", 5).style("stroke", "#aeb4bf");
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div	.html("<b>" + d.data.name + "</b>: <br/> <br/>"  + d.data.effect)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
        });

        nodes.append("text")
        
         .style("text-anchor", "middle")
        .style("font-size", "80%")
        .text(function(d) { if(d.data.value > 3) {return d.data.name} });

    }


    that.createActionsChart = createActionsChart;
    that.createActionsSVG = createActionsSVG;
    return that;

};
