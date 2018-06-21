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
        d3.json("res/assets/data/spellsData.json", function(data) {
          console.log(data);
            createBubbleData(data);
        });
    }


    function createBubbleData(data) {
        var object = {name: "root", children: []};
        //daten umwandeln
        for(var i = 0; i < data.spellsData.length; i++) {
          var json = data.spellsData;
          console.log(json[i]);
          let name = json[i].name, value = json[i].totalCount, effect = json[i].effect;
            // for (var j = 1; j < data.length; j++) {
            //     value = value + +data[j][name];
            // }
            let el = {name,value, effect};
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
