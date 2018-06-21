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
        div;

    function createChart(){
        var chart = document.getElementById("myChart");
        chart.style.height = "800";
        chart.style.width = "800";
        
        // Define the div for the tooltip
        div = d3.select("body").append("div")	
            .attr("class", "tooltip")				
            .style("opacity", 0);
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


    that.createChart = createChart;
    that.createSVG = createSVG;
    return that;

};
