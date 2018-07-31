/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
//nach https://bl.ocks.org/nbremer
//http://projects.delimited.io/experiments/chord-transitions/demos/trade.html
// Hier werden die Hintergrunddaten berechnet
var hp = hp || {};
hp.hpRelationsModel = function() {
    "use strict";
    var that = new EventPublisher();

    function loadRelationsData(layout) {

        //Datensätze einlesen

        d3.queue()
            .defer(d3.csv, "res/assets/data/characters.csv")
            .defer(d3.csv, "res/assets/data/relations.csv")
            //.defer(d3.json, "res/assets/data/matrix2.json")
            .await(combine);

        function combine(error, characters, relations) {
            if (error) {
                console.log(error);
            }

            //Strings in Zahlenwerte umwandeln
            characters.forEach(function(d) {
                d.id = +d.id;
            });

            relations.forEach(function(d) {
                d.source = +d.source;
                d.target = +d.target;
            });


            // MATRIX             
            d3.json("res/assets/data/matrix2.json", function(matrix) {

                // Compute the chord layout.
                layout.matrix(matrix.matrix);
                var returnElement = [layout, characters];

                that.notifyAll("relationsDataFinish", returnElement);

            });



        }
    }

    that.loadRelationsData = loadRelationsData;
    return that;


};