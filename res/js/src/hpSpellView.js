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
   //größe chart ggf anpassen   chart.style.height = 280px; chart.style.width = 280px;


      // Define the div for the tooltip
      div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
  }

          function createSpellSVG(root) {
              //SVG erstellen
              var selection = d3.select("#Chart2"),
                  g = selection.append("g").attr("transform", "translate(2,2)"),
                  colorCircles = d3.scaleSequential()
        .domain([55, 100])
        .interpolator(d3.interpolateRainbow);

              var nodes = g.selectAll(".node")
              .data(root.descendants().slice(1))
              .enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                //hier Bubble anpassungen
              nodes.append("circle").attr("r", function(d) {return d.r })
              
                  .style("fill", function(d) {return colorCircles(d.value)} )
                      .on("mouseover", function(d) {
                      d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                      div.transition()
                          .attr("id","pie")
                          .duration(200)
                          .style("opacity", .9)
                          .style("width","220px")
                          .style("height","250px")
                          .style("text-align","center");
                      div.html("<b>" + d.data.name + "</b> <br/> <br/>" + d.data.effect
                                + "<br/> Classification: " + d.data.classification)
                                .style("left", (d3.event.pageX) + "px")
                                .style("top", (d3.event.pageY - 28) + "px");


                      //-------Start of piechart------- (http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html)
                      var width="150",
                          height="150",
                          radius = Math.min(width, height)/2;
                      var color = d3.scaleOrdinal()
    	                          .range(["#930447","#82b74b"," #80ced6","#d96459","#de8be0","#4040a1","#e8e36a"]);

                     //Datenzuweisung
                        var data = [{"name":"ps","count":d.data.ss},{"name":"cos","count":d.data.cos},{"name":"poa","count":d.data.poa},{"name":"gof","count":d.data.gof},{"name":"ootp","count":d.data.ootp},{"name":"hbp","count":d.data.hbp},{"name":"dh","count":d.data.dh}];

                      var pie = d3.pie().value(function(e){return e.count;})(
                        data
                      );

                      var arc = d3.arc()
	                         .outerRadius(radius - 10)
	                         .innerRadius(0);

                      var labelArc = d3.arc()
                              .outerRadius(radius - 40)
                              .innerRadius(radius - 40);

                      var svg = d3.select("#pie")
                              .append("svg")
                              // .style("display","block")
                              // .style("margin","auto")
                              .attr("width", "200px")
                              .attr("height", "200px")
                                    .append("g")
                                    .attr("transform", "translate(" + (width/2 + 30) + "," + (height/2 + 20) +")");

                      var g = svg.selectAll("arc")
              	            .data(pie)
              	            .enter().append("g")
              	            .attr("class", "arc");

                      g.append("path")
      	               .attr("d", arc)
      	               //.style("fill", function(f) { return colorCircles(f.value);});
                       //.style("fill", function(){ return "hsl(" + Math.random() * 360 + ", 100%, 50%)";});
                       .style("fill", function(d){return color(d.data.name)});


                      //Text innerhalb den Kuchenteilen
                      g.append("text")
                  .style("text-anchor", "middle")
   	                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
   	                    //.text(function(d) { return d.data.name;})
                        .text(function(d) { if(d.data.count > 0) {return d.data.count} })
                        .style("fill", "#000")
                        .style("font-size", "120%");

                      //Text außerhalb der Kuchenteile
                      g.append("text")
                        .attr("transform", function(d) {
                          var c = arc.centroid(d),
                          x = c[0],
                          y = c[1],
                          // pythagorean theorem for hypotenuse
                          h = Math.sqrt(x*x + y*y);
                          return "translate(" + (x/h * radius) +  ',' +
                          (y/h * radius) +  ")";
                        })
                        .attr("text-anchor", function(d) {
                          // are we past the center?
                          return (d.endAngle + d.startAngle)/2 > Math.PI ?
                          "end" : "start";
                        })
                        .text(function(d) { if(d.data.count > 0) {return d.data.name} });






                      })


                      //-------End of piechart-------

                      .on("mouseout", function(d) {
                          d3.select(this).style("stroke", "none");
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);

              });

              nodes.append("text").style("text-anchor", "middle").text(function(d) { if(d.data.value > 3) {return d.data.name} });

  }

  that.createSpellChart = createSpellChart;
  that.createSpellSVG = createSpellSVG;
  return that;

};
