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

    function setupButtons(){
         document.getElementById("ps").onclick = function(){ spellsByPSSort();};
         document.getElementById("cos").onclick = function(){ spellsByCOSSort();};
         document.getElementById("poa").onclick = function(){ spellsByPOASort();};
         document.getElementById("gof").onclick = function(){ spellsByGOFSort();};
         document.getElementById("ootp").onclick = function(){ spellsByOOTPSort();};
         document.getElementById("hbp").onclick = function(){ spellsByHBPSort();};
         document.getElementById("dh").onclick = function(){ spellsByDHSort();};
         document.getElementById("all").onclick = function(){ spellsByAllSort();};

        d3.select("#toolbar")
          .selectAll(".button")
          .on("click", function(){
        //remove active class from all buttons
        d3.selectAll(".button").classed("active", false);
        //find the button just clicked
        var button = d3.select(this);
        //Set it as the active button
        button.classed("active", true);
     });
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


// erstellt bubblechart für alle spells
function spellsByAllSort(){
  deleteChart();
  //hier neues Chart
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
          .sum(function(d) { return d.value; })
          .sort(function(a, b) { return b.value - a.value; });

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
        .attr("class", function(d){return d.children ? "node" : "leaf node all";})
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

  d3.selectAll(".leaf.node.all")
    .transition()
    .duration(2000)
    .attr("r", function(d){return d.r;});

  nodes.append("text")
    .attr("class", function(d){return d.children ? "node" : "leaf node text";})
    .style("text-anchor", "middle")
    .attr("font-size", 0)
    .text(function(d) { if(d.data.value > 2) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of All spells

// erstellt bubblechart für PS
function spellsByPSSort() {
        deleteChart();
        //hier neues Chart

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
                .sum(function(d) { return d.ss; })
                .sort(function(a, b) { return b.ss - a.ss; });

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
              .attr("class", function(d){return d.children ? "node" : "leaf node ps";})
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

        d3.selectAll(".leaf.node.ps")
          .transition()
          .duration(2000)
          .attr("r", function(d){return d.r;});

        nodes.append("text")
          .attr("class", function(d){return d.children ? "node" : "leaf node text";})
          .style("text-anchor", "middle")
          .attr("font-size", 0)
          .text(function(d) { if(d.data.ss > 0) {return d.data.name} });

        d3.selectAll(".leaf.node.text")
          .transition()
          .duration(2100)
          .attr("font-size", 15);


          }

    }// End of spellsByPSSort

// erstellt bubblechart für CoS
function spellsByCOSSort() {
    deleteChart();
    //hier neues Chart
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
            .sum(function(d) { return d.cos; })
            .sort(function(a, b) { return b.cos - a.cos; });

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
          .attr("class", function(d){return d.children ? "node" : "leaf node cos";})
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

    d3.selectAll(".leaf.node.cos")
      .transition()
      .duration(2000)
      .attr("r", function(d){return d.r;});

    nodes.append("text")
      .attr("class", function(d){return d.children ? "node" : "leaf node text";})
      .style("text-anchor", "middle")
      .attr("font-size", 0)
      .text(function(d) { if(d.data.cos > 0) {return d.data.name} });

    d3.selectAll(".leaf.node.text")
      .transition()
      .duration(2100)
      .attr("font-size", 15);
      }
  }// End of spellsByCOSSort

// erstellt bubblechart für PoA
function spellsByPOASort(){
  deleteChart();
  //hier neues Chart
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
          .sum(function(d) { return d.poa; })
          .sort(function(a, b) { return b.poa - a.poa; });

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
        .attr("class", function(d){return d.children ? "node" : "leaf node poa";})
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

  d3.selectAll(".leaf.node.poa")
    .transition()
    .duration(2000)
    .attr("r", function(d){return d.r;});

  nodes.append("text")
    .attr("class", function(d){return d.children ? "node" : "leaf node text";})
    .style("text-anchor", "middle")
    .attr("font-size", 0)
    .text(function(d) { if(d.data.poa >0) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of POA spells

// erstellt bubblechart für GoF
function spellsByGOFSort(){
  deleteChart();
  //hier neues Chart
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
          .sum(function(d) { return d.gof; })
          .sort(function(a, b) { return b.gof - a.gof; });

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
        .attr("class", function(d){return d.children ? "node" : "leaf node gof";})
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

  d3.selectAll(".leaf.node.gof")
    .transition()
    .duration(2000)
    .attr("r", function(d){return d.r;});

  nodes.append("text")
    .attr("class", function(d){return d.children ? "node" : "leaf node text";})
    .style("text-anchor", "middle")
    .attr("font-size", 0)
    .text(function(d) { if(d.data.gof > 1) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of GOF spells

// erstellt bubblechart für OotP
function spellsByOOTPSort(){
  deleteChart();
  //hier neues Chart
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
          .sum(function(d) { return d.ootp; })
          .sort(function(a, b) { return b.ootp - a.ootp; });

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
        .attr("class", function(d){return d.children ? "node" : "leaf node ootp";})
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

  d3.selectAll(".leaf.node.ootp")
    .transition()
    .duration(2000)
    .attr("r", function(d){return d.r;});

  nodes.append("text")
    .attr("class", function(d){return d.children ? "node" : "leaf node text";})
    .style("text-anchor", "middle")
    .attr("font-size", 0)
    .text(function(d) { if(d.data.ootp > 1) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of OOTP spells

// erstellt bubblechart für HBP
function spellsByHBPSort(){
  deleteChart();
  //hier neues Chart
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
          .sum(function(d) { return d.hbp; })
          .sort(function(a, b) { return b.hbp - a.hbp; });

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
        .attr("class", function(d){return d.children ? "node" : "leaf node hbp";})
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

  d3.selectAll(".leaf.node.hbp")
    .transition()
    .duration(2000)
    .attr("r", function(d){return d.r;});

  nodes.append("text")
    .attr("class", function(d){return d.children ? "node" : "leaf node text";})
    .style("text-anchor", "middle")
    .attr("font-size", 0)
    .text(function(d) { if(d.data.hbp > 1) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of HBP spells

// erstellt bubblechart für DH
function spellsByDHSort(){
  deleteChart();
  //hier neues Chart
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
    .text(function(d) { if(d.data.dh > 1) {return d.data.name} });

  d3.selectAll(".leaf.node.text")
    .transition()
    .duration(2100)
    .attr("font-size", 15);
    }
}// End of DH spells



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
