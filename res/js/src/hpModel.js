/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpModel = function() {
    "use strict";
    var that = new EventPublisher(),
        root;

    function init () {
    }

    function loadData() {
        d3.csv("res/assets/data/elements-by-episode.csv", function(data) {
            createBubbleData(data);
        });
    }


    function createBubbleData(data) {
        var object = {name: "root", children: []};
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

        root = d3.hierarchy(object)
            .sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.value - a.value; });

        nodeFkt(root);
        that.notifyAll("rootAvailable", root);
    }


  that.init = init;
    that.loadData = loadData;
  return that;

};
