/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
/**
 * Hier werden die Hintergrunddaten berechnet
 */
var hp = hp || {};
hp.hpActionsModel = function() {
    "use strict";
    var that = new EventPublisher();

    function loadCodeflowerData(area) {
        //Beim ersten laden der Daten auch das Popup initialisieren
        d3.select(".openFlowerPopup").on("click", function() {
            that.notifyAll("loadFlowerPopup");
        });

        d3.json("res/assets/data/CF.json", function(data) {
            if (area == "preview") that.notifyAll("jsonDataAvailable", data);
            else that.notifyAll("jsonPopupDataAvailable", data);
        })
    }

    that.loadCodeflowerData = loadCodeflowerData;
    return that;


};