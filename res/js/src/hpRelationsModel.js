	/* eslint-env browser */
	/* global EventPublisher */

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

             function combine (error, characters, relations){
                if (error){
                    console.log(error);
                }

                //Strings in Zahlenwerte umwandeln
                characters.forEach(function (d){
                    d.id = +d.id;
                });
                console.log(characters);

                relations.forEach(function (d){
                    d.source = +d.source;
                    d.target = +d.target;
                });
                console.log(relations);
              
                
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
