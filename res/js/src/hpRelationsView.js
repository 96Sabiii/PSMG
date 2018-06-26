	/* eslint-env browser */
	/* global EventPublisher */

// Hier werden die Hintergrunddaten berechnet
  
  var hp = hp || {};
  hp.hpRelationsView = function() {
  	"use strict";
  	var that = new EventPublisher(),
        svg,
        arc,
        path;

      
      function createRelationsChart() {
           //Grundgerüst erstellen
           var width = 720,
           height = 720,
           outerRadius = Math.min(width, height) / 2 - 10,
           innerRadius = outerRadius - 24;

           var formatPercent = d3.format(".1%");

           arc = d3.svg.arc()
           .innerRadius(innerRadius)
           .outerRadius(outerRadius);

           var layout = d3.layout.chord()
           .padding(.04)
           .sortSubgroups(d3.descending)
           .sortChords(d3.ascending);

           path = d3.svg.chord()
           .radius(innerRadius);

           svg = d3.select("body").append("svg")
           .attr("width", width)
           .attr("height", height)
           .append("g")
           .attr("id", "circle")
           .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

           svg.append("circle")
           .attr("r", outerRadius);

        // Define the div for the tooltip
        /*div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);*/
          
          return layout;
      }

      function showRelationsChart(element) {
          var layout = element[0],
              characters = element[1];
            var group = svg.selectAll(".group")
            .data(layout.groups)
            .enter().append("g")
            .attr("class", "group")
            .on("mouseover", mouseover); /*function(d) {
                d3.select(this).style("stroke-width", 3).style("stroke", "black");
                div.transition()
                .duration(200)
                .style("opacity", .9);
                div.html("<b>" + d.characters.name + "</b>: <br/> <br/>"  + d.characters.bio)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                d3.select(this).style("stroke", "none");
                div.transition()
                .duration(500)
                .style("opacity", 0);*/


                //  group arc
                var groupPath = group.append("path")
                .attr("id", function(d, i) { return "group" + i; })
                .attr("d", arc)
                .style("fill", function(d, i) { return characters[i].color; });

                // text label
                var groupText = group.append("text")
                .attr("x", 6)
                .attr("dy", 15);

                groupText.append("textPath")
                .attr("xlink:href", function(d, i) { return "#group" + i; })
                .style("text-anchor", "middle")
                .text(function(d, i) { return characters[i].name; 
                }); 


                // Add chords
                var chord = svg.selectAll(".chord")
                .data(layout.chords)
                .enter().append("path")
                .attr("class", "chord")
                .style("fill", function(d) { return characters[d.source.index].color; })
                .attr("d", path);


                function mouseover(d, i) {
                    chord.classed("fade", function(p) {
                        return p.source.index != i
                        && p.target.index != i;
                    });
                }
             }
        that.showRelationsChart = showRelationsChart;
        that.createRelationsChart = createRelationsChart;
          return that;

      
  };
