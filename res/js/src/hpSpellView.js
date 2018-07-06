/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpSpellView = function() {
  "use strict";
  var that = new EventPublisher(),
      div,
      size = 1400,
      smalSize =1300,
      chart;
    //chart braucht man nicht? ändert nichts

    function createSpellChart(){
      chart = document.getElementById("Chart2");

      // Define the div for the tooltip
      div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0);
    }

    function createSVG(data) {
        var root = data[0],
            bookNr = data [1],
            bookString;
        if (bookNr == "all") {
            createSpellSVG(root);
        } else {
            if (bookNr == 4) {
                bookString = "dh";
            } else if (bookNr == 5) {
                bookString = "hbp";
            } else if (bookNr == 6) {
                bookString = "ootp";
            } else if (bookNr == 7) {
                bookString = "gof";
            } else if (bookNr == 8) {
                bookString = "poa";
            } else if (bookNr == 9) {
                bookString = "cos";
            } else if (bookNr == 10) {
                bookString = "ps";
            } else {
                bookString = "all";
            }
            spellsByBook(root, bookString, bookNr);
        }
    }

    //doppelter code, wenn if all dann pie chart
    function createSpellSVG(root) {
              //SVG erstellen
        deleteChart();
              var selection = d3.select("#Chart2"),
                  g = selection.append("g").attr("transform", "translate(2,2)"),
                  colorCircles = d3.scaleSequential()
                  .domain([0, 15])
                  .interpolator(d3.interpolateRainbow);

              var nodes = g.selectAll(".node")
              .data(root.descendants().slice(1))
              .enter().append("g")
                .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
                .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

                //hier Bubble anpassungen

              nodes.append("circle")
                .attr("class", function(d){return d.children ? "node" : "leaf node circle";})
                //.attr("r", function(d) {return d.r })
                .attr("r", 0)
                  .style("fill", function(d) {return colorCircles(d.value)} )
                      .on("mouseover", function(d) {
                      d3.select(this).style("stroke-width", 4).style("stroke", " #aeb4bf");
                      div.transition()
                          .attr("id","pie")
                          .duration(200)
                          .style("opacity", .9)
                          .style("width","220px")
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
    	                          .range(["#FF0000","#FF7F00","#FFFF00","#00FF00","#0000FF","#4B0082","#9400D3"]);

                     //Datenzuweisung
                      var data = [{"name":"ps","count":d.data.ss},
                                  {"name":"cos","count":d.data.cos},
                                  {"name":"poa","count":d.data.poa},
                                  {"name":"gof","count":d.data.gof},
                                  {"name":"ootp","count":d.data.ootp},
                                  {"name":"hbp","count":d.data.hbp},
                                  {"name":"dh","count":d.data.dh}];

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
                              .attr("width", "200px")
                              .attr("height", "100px")
                                    .append("g")
                                    //Ändere die Werte in "translate" um die Position des Piecharts zu ändern
                                    .attr("transform", "translate(" + (width/2 + 30) + "," + (height/2 + 20) +")");

                      var g = svg.selectAll("arc")
              	            .data(pie)
              	            .enter().append("g")
              	            .attr("class", "arc");

                      g.append("path")
      	               .attr("d", arc)
                       .style("fill", function(d){return color(d.data.name)});


                      //Text innerhalb den Kuchenteilen
                      g.append("text")
                        .style("text-anchor", "middle")
   	                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
                        .text(function(d) { if(d.data.count > 0) {return d.data.count} })
                        .style("fill", "#000")
                        .style("font-size", "100%");

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

              d3.selectAll(".leaf.node.circle")
                .transition()
                .duration(2000)
                .attr("r", function(d){return d.r;});

              nodes.append("text")
                .attr("class", function(d){return d.children ? "node" : "leaf node text";})
                .attr("font-size", 0 + "px")
                .style("text-anchor", "middle")
                .text(function(d) { if(d.data.value > 3) {return d.data.name} });

              d3.selectAll(".leaf.node.text")
                .transition()
                .duration(2100)
                .attr("font-size", 20 + "px");

            } //End of CreateSpellSVG()

// erstellt book sorted bubble chart
    function spellsByBook(root, sortString, bookNr) {
        deleteChart();
        //hier neues Chart
            var selection = d3.select("#Chart2"),
                g = selection.append("g").attr("transform", "translate(2,2)"),
                colorCircles = d3.scaleSequential()
                .domain([0, 15])
                .interpolator(d3.interpolateRainbow);

            var nodes = g.selectAll(".node")
            .data(root.descendants().slice(1))
            .enter().append("g")
              .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
              .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
              //hier Bubble anpassungen
            nodes.append("circle")
              .attr("class", function(d){return d.children ? "node" : "leaf node " + sortString;})
              //.attr("r", function(d) {return d.r })
              .attr("r", 0)
                .style("fill", function(d) {return colorCircles(d.value)} )
                .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", 4).style("stroke", " #aeb4bf");
                div.transition()
                    .duration(200)
                    .style("opacity", .9)
                    .style("width","220px")
                    .style("text-align","center");
                div.html("<b>" + d.data.name + "</b> <br/> <br/>" + d.data.effect
                          + "<br/> Classification: " + d.data.classification)
                          .style("left", (d3.event.pageX) + "px")
                          .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                          d3.select(this).style("stroke", "none");
                          div.transition()
                              .duration(500)
                              .style("opacity", 0);
                });

        d3.selectAll(".leaf.node." + sortString)
          .transition()
          .duration(2000)
          .attr("r", function(d){return d.r;});

        nodes.append("text")
          .attr("class", function(d){return d.children ? "node" : "leaf node text";})
          .attr("font-size", 0 +"px")
          .style("text-anchor", "middle")
          .text(function(d) {var input = d.data, count = Object.values(input)[bookNr]; if(count > 0) {return d.data.name} });
        //ss gibts nicht?

        d3.selectAll(".leaf.node.text")
          .transition()
          .duration(2100)
          .attr("font-size", 20 + "px");
}

    function deleteChart() {
        while (chart.firstChild) {
            chart.removeChild(chart.firstChild);
        }
    }

  that.createSpellChart = createSpellChart;
  that.createSVG = createSVG;
    that.spellsByBook = spellsByBook;
  return that;
};
