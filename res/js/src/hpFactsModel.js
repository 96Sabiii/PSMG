/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
var hp = hp || {};
hp.hpFactsModel = function() {
    "use strict";
    var that = new EventPublisher();

    function initPopups() {
        d3.select(".openPopup1").on("click", function() {
            that.notifyAll("loadWordsPopup");
        });
        d3.select("#openSalesPopup").on("click", function() {
            that.notifyAll("loadSalesPopup");
        });
        d3.select(".openPopup2").on("click", function() {
            that.notifyAll("loadMarksPopup");
        });
    }


    function loadMarksChartData(area) {
        d3.csv("res/assets/data/satzzeichen.csv", function(d, i, columns) {
            var t = 0;
            for (i = 1; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
            d.total = t;
            return d;
        }, function(error, data) {
            if (error) throw error;
            if (area == "preview") that.notifyAll("marksChartDataLoaded", data);
            else that.notifyAll("marksPopupDataLoaded", data);
        });
    }

    function loadWordsChartData(area) {
        d3.csv("res/assets/data/words.csv", function(d, i, columns) {
            //console.log(d,i,columns);
            for (var j = 1, n = columns.length; j < n; ++j) d[columns[j]] = +d[columns[j]];
            return d;
        }, function(error, data) {
            if (error) throw error;
            if (area == "preview") that.notifyAll("wordsChartDataLoaded", data);
            else that.notifyAll("wordsPopupDataLoaded", data);
        });
    }

    function loadSalesData(area) {
        d3.json("res/assets/data/salesData.json", function(data) {
            if (area == "preview") that.notifyAll("salesDataLoaded", data.freqData);
            else that.notifyAll("salesPopupDataLoaded", data.freqData);
        });
    }

    that.initPopups = initPopups;
    that.loadMarksChartData = loadMarksChartData;
    that.loadWordsChartData = loadWordsChartData;
    that.loadSalesData = loadSalesData;
    return that;

};