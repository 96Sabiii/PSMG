/* eslint-env browser */
/* global EventPublisher */

/**
  * Hier werden die Hintergrunddaten berechnet
  */
var hp = hp || {};
hp.hpSpellModel = function() {
    "use strict";
    var that = new EventPublisher(),
        root,
        size = 1250;

    function init () {
    }

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
          let name = json[i].name, value = json[i].totalCount,
              effect = json[i].effect, classification = json[i].classification,
              dh = json[i].DHCount, hbp = json[i].HBPCount,
              ootp = json[i].OotPCount, gof = json[i].GoFCount,
              poa = json[i].PoACount, cos = json[i].CoSCount,
              ss = json[i].SSCount;
            // for (var j = 1; j < data.length; j++) {
            //     value = value + +data[j][name];
            // }
            let el = {name, value, effect, classification,
                      dh, hbp, ootp, gof, poa, cos, ss};
            object.children.push(el);
        }

        //Bubblechart erstellen
        var nodeFkt = d3.pack().size([size, size]);

        root = d3.hierarchy(object)
            .sum(function(d) { return d.value; })
            .sort(function(a, b) { return b.value - a.value; });

        nodeFkt(root);
        that.notifyAll("spellRootAvailable", root);

    }

    that.init = init;
    that.loadBubbleData = loadBubbleData;
    //that.createChord = createChord;
    return that;

};
