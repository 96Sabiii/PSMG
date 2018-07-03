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
      chart,
      center = { x: size/2, y: size/2 };
    //chart braucht man nicht? ändert nichts

    var bookCenters = {
      PS: { x: size/7, y: size/2},
      COS: { x: 2 * size/7, y: size/2},
      POA: { x: 3 * size/7, y: size/2},
      GOF: { x: size/2, y: size/2},
      OOTP: { x: 4 * size/7, y: size/2},
      HBP: { x: 5 * size/7, y: size/2},
      DH: { x: 6 * size/7, y: size/2}
    };

    var booksTitleX = {
      PS: 200,
      COS: 350,
      POA: 500,
      GOF: 700,
      OOTP: 850,
      HBP: 900,
      DH: 1050
    };

    var damper = 0.102;

    function charge(d){
      return -Math.pow(d.r, 2.0) / 8;
    }

    var force = d3.layout.force()
      .size([size, size])
      .charge(charge)
      .gravity(-0.01)
      .friction(0.9);

    function setupButtons(){
         document.getElementById("book").onclick = function(){ spellsByBookSort();};
         document.getElementById("all").onClick = function(){ spellsByAllSort();};

        /*d3.select("#toolbar")
          .selectAll(".button")
          .on("click", function(){
        //remove active class from all buttons
        d3.selectAll(".button").classed("active", false);
        //find the button just clicked
        var button = d3.select(this);

        //Set it as the active button
        button.classed("active", true);

        //get the id of the button
        var buttonId = button.attr("id");

        //toggle the bubble chart based on
        //the currently clicked buttton.
       // myBubbleChart.toggleDisplay(buttonId);
     }); */
      }

    function createSpellChart(){
      chart = document.getElementById("Chart2");
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
                  colorCircles = d3.scaleSequential()
                  .domain([55, 100])
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
                              .attr("height", "200px")
                                    .append("g")
                                    //Ändere die Zahlen in "translate" um die Position des Piecharts zu ändern
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
   	                    .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
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

              d3.selectAll(".leaf.node.circle")
                .transition()
                .duration(2000)
                .attr("r", function(d){return d.r;});

              nodes.append("text")
                .attr("class", function(d){return d.children ? "node" : "leaf node text";})
                .style("text-anchor", "middle")
                .attr("font-size", 0)
                .text(function(d) { if(d.data.value > 3) {return d.data.name} });

              d3.selectAll(".leaf.node.text")
                .transition()
                .duration(2100)
                .attr("font-size", 15);

            } //End of CreateSpellSVG()




// erstellt bubblechart für DH
    function spellsByBookSort() {
        deleteChart();
        //hier neues Chart
        createSpellChart();

        var root;

        d3.json("res/assets/data/spellsData.json", function(data) {
            createBubbleData(data);
        });

        function createBubbleData(data) {
            var object = {name: "root", children: []};
            //daten umwandeln
            for(var i = 0; i < data.spellsData.length; i++) {
              var json = data.spellsData;
              let name = json[i].name, value = json[i].totalCount,
                  effect = json[i].effect, classification = json[i].classification,
                  dh = json[i].DHCount, hbp = json[i].HBPCount,
                  ootp = json[i].OotPCount, gof = json[i].GoFCount,
                  poa = json[i].PoACount, cos = json[i].CoSCount,
                  ss = json[i].SSCount;
                let el = {name, value, effect, classification,
                          dh, hbp, ootp, gof, poa, cos, ss};
                object.children.push(el);
            }

            //Bubblechart erstellen
            var nodeFkt = d3.pack().size([700, 700]);

            root = d3.hierarchy(object)
                .sum(function(d) { return d.dh; })
                .sort(function(a, b) { return b.dh - a.dh; });

            nodeFkt(root);


            //svg erstellen
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
            nodes.append("circle")
              .attr("class", function(d){return d.children ? "node" : "leaf node dh";})
              //.attr("r", function(d) {return d.r })
              .attr("r", 0)
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
                        .attr("height", "200px")
                              .append("g")
                              //Ändere die Zahlen in "translate" um die Position des Piecharts zu ändern
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
                  .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
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

        d3.selectAll(".leaf.node.dh")
          .transition()
          .duration(2000)
          .attr("r", function(d){return d.r;});

        nodes.append("text")
          .attr("class", function(d){return d.children ? "node" : "leaf node text";})
          .style("text-anchor", "middle")
          .attr("font-size", 0)
          .text(function(d) { if(d.data.dh > 2) {return d.data.name} });

        d3.selectAll(".leaf.node.text")
          .transition()
          .duration(2100)
          .attr("font-size", 15);


          }

    }// End of spellsByBookSort


    function spellsByAllSort(){
      deleteChart();
      //Hier erstes Chart


    }


    function deleteChart() {
        while (chart.firstChild) {
            chart.removeChild(chart.firstChild);
        }
    }


  setupButtons();
  that.createSpellChart = createSpellChart;
  that.createSpellSVG = createSpellSVG;
  return that;

};
