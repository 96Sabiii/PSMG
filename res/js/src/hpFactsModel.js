/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
  
var hp = hp || {};
hp.hpFactsModel = function() {
    "use strict";
    var that = new EventPublisher();

    
    function loadMarksChartData (area) {
        d3.csv("res/assets/data/satzzeichen.csv", function(d, i, columns) {
              // console.log(d,i,columns);
              var  t = 0;
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
          for (var i = 1, n = columns.length; i < n; ++i) d[columns[i]] = +d[columns[i]];
          return d;
        }, function(error, data) {
            if (error) throw error;
            if (area == "preview") that.notifyAll("wordsChartDataLoaded", data); 
            else that.notifyAll("wordsPopupDataLoaded", data);
        });
    }
    
    function loadSalesData(area){
//        let object = [];
//        d3.json("res/assets/data/movies_sales_figures.json", function(data) {
//            let freq = {};
//            //daten umwandeln
//            for(var i = 0; i < data.movies_sales_figures.length; i++) {
//                var json = data.movies_sales_figures;
//                let bookName = json[i].name, publication = json[i].publication, USA = json[i].box_office_USA, overseas = json[i].box_office_overseas , world = json[i].box_office_world;
//                let name = bookName + publication,
//                    total = USA + overseas + world;
//                    freq = {USA, overseas, world, total}
//                let el = {name, freq};
//                object.push(el);
//            }
//            that.notifyAll("salesDataLoaded", object);
//        });
        d3.json("res/assets/data/salesData.json", function(data) {
            if (area == "preview") that.notifyAll("salesDataLoaded", data.freqData); 
            else that.notifyAll("salesPopupDataLoaded", data.freqData);
        });
    }
               
    that.loadMarksChartData = loadMarksChartData;
    that.loadWordsChartData = loadWordsChartData;
    that.loadSalesData = loadSalesData;
    return that;

};