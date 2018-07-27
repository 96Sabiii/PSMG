/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
  
var hp = hp || {};
hp.hpFactsModel = function() {
    "use strict";
    var that = new EventPublisher();
    
    function loadData() {
        loadMarksChartData();
        loadWordsChartData();
    }
    
    function loadMarksChartData () {
        d3.csv("res/assets/data/satzzeichen.csv", function(d, i, columns) {
              // console.log(d,i,columns);
              var  t = 0;
              for (i = 1; i < columns.length; ++i) t += d[columns[i]] = +d[columns[i]];
              d.total = t;
              return d;
        }, function(error, data) {
            if (error) throw error;
            that.notifyAll("marksChartDataLoaded", data);
        });
    }
    
    function loadWordsChartData() {
        d3.csv("res/assets/data/words.csv", function(d, i, columns) {
           //console.log(d,i,columns);
          for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
          return d;
        }, function(error, data) {
          if (error) throw error;
            that.notifyAll("wordsChartDataLoaded", data);
        });
    }
               
    that.loadData = loadData;
    return that;

};