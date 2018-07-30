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

    function loadCodeflowerData() {
        return d3.json("res/assets/data/CF.json", function(data) {
            return data;
        })
    }

    that.loadCodeflowerData = loadCodeflowerData;
    return that;


};
