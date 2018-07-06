/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */

var hp = hp || {};
hp.hpActionsModel = function() {
  "use strict";
  var that = new EventPublisher();

        function loadBubbleData() {
        d3.json("res/assets/data/spellsData.json", function(data) {
            createBubbleData(data);
        });
    }


    function createBubbleData(data) {
        var object = {name: "root", children: []};
        //daten umwandeln
        for(var i = 0; i < data.spellsData.length; i++) {
          var json = data.spellsData;
          let name = json[i].name, value = json[i].totalCount, effect = json[i].effect;
            // for (var j = 1; j < data.length; j++) {
            //     value = value + +data[j][name];
            // }
            let el = {name,value, effect};
            object.children.push(el);
        }

        //Diagramm erstellen

        var root = d3.hierarchy(object)
            .sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.value - a.value; });

        that.notifyAll("actionsRootAvailable", root);
    }

    //chort Diagramm
/*
    var width = 720,
    height = 720,
    outerRadius = Math.min(width, height) / 2 - 10,
    innerRadius = outerRadius - 24;

    var formatPercent = d3.format(".1%");

    var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);

    var layout = d3.layout.chord()
    .padding(.04)
    .sortSubgroups(d3.descending)
    .sortChords(d3.ascending);

    var path = d3.svg.chord()
    .radius(innerRadius);

    var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("id", "circle")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    svg.append("circle")
    .attr("r", outerRadius);

    d3.json("res/assets/data/wizards.json", function(data) {
        // Construct a square matrix counting package imports.
        Object.keys(data.wizards).forEach(function(d,i) {
          var source = indexByName.get(data.wizards[i].name),
              row = matrix[source];
          if (!row) {
           row = matrix[source] = [];
           for (var i = -1; ++i < n;) row[i] = 0;
          }
          data.wizards.forEach(function(d) { row[indexByName.get(name(d))]++; });
        });

    // Compute the chord layout.
    layout.matrix(matrix);

    // Add a group per neighborhood.
    var group = svg.selectAll(".group")
    .data(layout.groups)
    .enter().append("g")
    .attr("class", "group")
    .on("mouseover", mouseover);

    // Add a mouseover title.
    // group.append("title").text(function(d, i) {
    // return cities[i].name + ": " + formatPercent(d.value) + " of origins";
    // });

    // Add the group arc.
    var groupPath = group.append("path")
    .attr("id", function(d, i) { return "group" + i; })
    .attr("d", arc)
    .style("fill", function(d, i) { return cities[i].color; });

    // Add a text label.
    var groupText = group.append("text")
    .attr("x", 6)
    .attr("dy", 15);

    groupText.append("textPath")
    .attr("xlink:href", function(d, i) { return "#group" + i; })
    .text(function(d, i) { return cities[i].name; });

    // Remove the labels that don't fit. :(
    groupText.filter(function(d, i) { return groupPath[0][i].getTotalLength() / 2 - 16 < this.getComputedTextLength(); })
    .remove();

    // Add the chords.
    var chord = svg.selectAll(".chord")
    .data(layout.chords)
    .enter().append("path")
    .attr("class", "chord")
    .style("fill", function(d) { return cities[d.source.index].color; })
    .attr("d", path);

    // Add an elaborate mouseover title for each chord.
     chord.append("title").text(function(d) {
     return cities[d.source.index].name
     + " → " + cities[d.target.index].name
     + ": " + formatPercent(d.source.value)
     + "\n" + cities[d.target.index].name
     + " → " + cities[d.source.index].name
     + ": " + formatPercent(d.target.value);
     });

    function mouseover(d, i) {
    chord.classed("fade", function(p) {
    return p.source.index != i
    && p.target.index != i;
    });
    }
    });
    });

  }*/

    that.loadBubbleData = loadBubbleData;
    //that.createChord = createChord;
    return that;


};
