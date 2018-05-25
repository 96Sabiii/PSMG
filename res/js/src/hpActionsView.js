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

  function bubbleChart(){
    console.log("bubblechart");
    doChart();
  }

function doChart() {
    d3.csv("../../assets/data/elements-by-episode.csv", function(error, data) {
        createBubbleData(data);
    });
}


// Für 2.2
function createBubbleData(data) {
    "use strict";
    var chart = document.getElementById("myChart");
    chart.style.height = "800";
    chart.style.width = "800";
    var object = {name: "root", children: []},
        selection = d3.select("#myChart"),
        g = selection.append("g").attr("transform", "translate(2,2)"),
        colorCircles = d3.scaleOrdinal(d3.schemeCategory20);
    
    //daten umwandeln
    for(var i = 2; i < data.columns.length; i++) {
        let name = data.columns[i], value = 0;
        for (var j = 1; j < data.length; j++) {
            value = value + +data[j][name];
        }
        let el = {name,value}; 
        object.children.push(el); 
    }
    
    //Diagramm erstellen
    var nodeFkt = d3.pack().size([700, 700]);
    
    var root = d3.hierarchy(object)
        .sum(function(d) { return d.value; })
        .sort(function(a, b) { return b.value - a.value; });
    
    nodeFkt(root);
    
    console.log(root);
    //SVG erstellen
    var nodes = g.selectAll(".node")
    .data(root.descendants())
    .enter().append("g")
      .attr("class", function(d) { return d.children ? "node" : "leaf node"; })
      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    var circles = nodes.append("circle").attr("r", function(d) {return d.r })
        .style("fill", function(d) {return colorCircles(d.value)} );
    var labels = nodes.append("text").text(function(d) {return d.data.name });
    
}

  that.bubbleChart = bubbleChart;
  return that;

};
