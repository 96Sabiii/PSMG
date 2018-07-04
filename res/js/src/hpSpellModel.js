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
        object,
        size = 1250;

    function loadBubbleData(bookNr) {
        d3.json("res/assets/data/spellsData.json", function(data) {
            //daten bei jedem klick geladen, evtl auhc if ob all
            createDataObject(data);
            createBubbleDataNew(data, bookNr);
        });
    }


    function createDataObject(data) {
        object = {name: "root", children: []};
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
    }
    
    function createBubbleDataNew(data, bookNr) {
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
        
        if (bookNr == "all") {

            //Bubblechart erstellen
            var nodeFkt = d3.pack().size([size, size]);

            root = d3.hierarchy(object)
                .sum(function(d) { return d.value; })
                .sort(function(a, b) {return b.value - a.value; });

        } else {
            
            //Bubblechart erstellen
            var nodeFkt = d3.pack().size([size, size]);
            
            root = d3.hierarchy(object)
            .sum(function(d) {return Object.values(d)[bookNr]; })
            .sort(function(a, b) {return Object.values(b)[bookNr] - Object.values(a)[bookNr]; });

//            root = d3.hierarchy(object)
//                .sum(function(d){ console.log(d.sortString); return d.sortString})
        }
        nodeFkt(root);
        data = [root, bookNr];
        that.notifyAll("spellRootAvailable", data);

    }
    
    function setupButtons(){
        //model auslagern
         document.getElementById("ps").onclick = function(){ loadBubbleData(10); };
         document.getElementById("cos").onclick = function(){ loadBubbleData(9); };
         document.getElementById("poa").onclick = function(){ loadBubbleData(8);};
         document.getElementById("gof").onclick = function(){ loadBubbleData(7); };
         document.getElementById("ootp").onclick = function(){ loadBubbleData(6); };
         document.getElementById("hbp").onclick = function(){ loadBubbleData(5); };
         document.getElementById("dh").onclick = function(){ loadBubbleData(4); };
         document.getElementById("all").onclick = function(){ loadBubbleData("all"); };
    }

    that.loadBubbleData = loadBubbleData;
    that.setupButtons = setupButtons;
    //that.createChord = createChord;
    return that;

};
