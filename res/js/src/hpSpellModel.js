/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
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

    function loadBubbleData(bookNr, area) {
        d3.json("res/assets/data/spellsData.json", function(data) {
            //daten bei jedem klick geladen, evtl auhc if ob all
            createDataObject(data);
            createBubbleDataNew(data, bookNr, area);
        });
    }


    function createDataObject(data) {
        object = {
            name: "root",
            children: []
        };
        //daten umwandeln
        for (var i = 0; i < data.spellsData.length; i++) {
            var json = data.spellsData;
            var name = json[i].name,
                value = json[i].totalCount,
                effect = json[i].effect,
                classification = json[i].classification,
                dh = json[i].DHCount,
                hbp = json[i].HBPCount,
                ootp = json[i].OotPCount,
                gof = json[i].GoFCount,
                poa = json[i].PoACount,
                cos = json[i].CoSCount,
                ss = json[i].SSCount;

            var el = {
                name,
                value,
                effect,
                classification,
                dh,
                hbp,
                ootp,
                gof,
                poa,
                cos,
                ss
            };
            object.children.push(el);
        }
    }

    function createBubbleDataNew(data, bookNr, area) {
        var object = {
            name: "root",
            children: []
        };
        //daten umwandeln
        for (var i = 0; i < data.spellsData.length; i++) {
            var json = data.spellsData;
            let name = json[i].name,
                value = json[i].totalCount,
                effect = json[i].effect,
                classification = json[i].classification,
                dh = json[i].DHCount,
                hbp = json[i].HBPCount,
                ootp = json[i].OotPCount,
                gof = json[i].GoFCount,
                poa = json[i].PoACount,
                cos = json[i].CoSCount,
                ss = json[i].SSCount;
            let el = {
                name,
                value,
                effect,
                classification,
                dh,
                hbp,
                ootp,
                gof,
                poa,
                cos,
                ss
            };
            object.children.push(el);
        }

        if (bookNr == "all") {

            //Bubblechart erstellen
            var nodeFkt = d3.pack().size([size, size]);

            root = d3.hierarchy(object)
                .sum(function(d) {
                    return d.value;
                })
                .sort(function(a, b) {
                    return b.value - a.value;
                });

        } else {

            //Bubblechart erstellen
            var nodeFkt = d3.pack().size([size, size]);

            root = d3.hierarchy(object)
                .sum(function(d) {
                    return Object.values(d)[bookNr];
                })
                .sort(function(a, b) {
                    return Object.values(b)[bookNr] - Object.values(a)[bookNr];
                });
        }
        
        nodeFkt(root);
        data = [root, bookNr];
        if (area == "preview") that.notifyAll("spellRootAvailable", data);
        else that.notifyAll("spellPopupRootAvailable", data);

    }

    function setupButtons() {
        //model auslagern
        document.getElementById("ps").onclick = function() {
            that.notifyAll("newData", 10)
        };
        document.getElementById("cos").onclick = function() {
            that.notifyAll("newData", 9)
        };
        document.getElementById("poa").onclick = function() {
            that.notifyAll("newData", 8)
        };
        document.getElementById("gof").onclick = function() {
            that.notifyAll("newData", 7)
        };
        document.getElementById("ootp").onclick = function() {
            that.notifyAll("newData", 6)
        };
        document.getElementById("hbp").onclick = function() {
            that.notifyAll("newData", 5)
        };
        document.getElementById("dh").onclick = function() {
            that.notifyAll("newData", 4)
        };
        document.getElementById("all").onclick = function() {
            that.notifyAll("newData", "all")
        };

        d3.select("#toolbar")
            .selectAll(".button")
            .on("click", function() {
                // Remove active class from all buttons
                d3.selectAll('.button').classed('active', false);
                // Find the button just clicked
                var button = d3.select(this);
                // Set it as the active button
                button.classed('active', true);
            })


    }

    function setupPopupButtons() {
        document.getElementById("popPs").onclick = function() {
            that.notifyAll("newPopupData", 10)
        };
        document.getElementById("popCos").onclick = function() {
            that.notifyAll("newPopupData", 9)
        };
        document.getElementById("popPoa").onclick = function() {
            that.notifyAll("newPopupData", 8)
        };
        document.getElementById("popGof").onclick = function() {
            that.notifyAll("newPopupData", 7)
        };
        document.getElementById("popOotp").onclick = function() {
            that.notifyAll("newPopupData", 6)
        };
        document.getElementById("popHbp").onclick = function() {
            that.notifyAll("newPopupData", 5)
        };
        document.getElementById("popDh").onclick = function() {
            that.notifyAll("newPopupData", 4)
        };
        document.getElementById("popAll").onclick = function() {
            that.notifyAll("newPopupData", "all")
        };
    }

    that.setupPopupButtons = setupPopupButtons;
    that.loadBubbleData = loadBubbleData;
    that.setupButtons = setupButtons;
    return that;

};