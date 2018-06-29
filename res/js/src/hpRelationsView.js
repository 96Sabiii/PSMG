/* eslint-env browser */
/* global EventPublisher */

// Hier werden die Hintergrunddaten berechnet

var hp = hp || {};
hp.hpRelationsView = function() {
	"use strict";
	var that = new EventPublisher(),
      svg,
      arc,
      path, 
      innerRadius, 
      outerRadius,
      div,
      m=110,
      size = 900;
      
      
    
    
    function createRelationsChart() {
         //Grundgerüst erstellen
         var margin = {left:m, top:m, right:m, bottom:m},
  width = Math.min(window.innerWidth, size) - margin.left - margin.right,
    height = Math.min(window.innerWidth, size) - margin.top - margin.bottom;
    innerRadius = Math.min(width, height) * .39;
    outerRadius = innerRadius + 15;
       // var formatPercent = d3.format(".1%");

         arc = d3.svg.arc()
         .innerRadius(innerRadius)
         .outerRadius(outerRadius);

        path = d3.svg.chord()
         .radius(innerRadius);

         

         div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);
         

         var layout = d3.layout.chord()
         .padding(.04)
         .sortSubgroups(d3.descending)
         .sortChords(d3.ascending);

        

         svg = d3.select("#Chart3").append("svg")
         /*.attr("width", width)
         .attr("height", height)
         .append("g")
         .attr("id", "circle")
         .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");*/
         .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
   .attr("id", "circle")
    .attr("transform", "translate(" + (width/2 + margin.left) + "," + (height/2 + margin.top) + ")");

         svg.append("circle")
         .attr("r", outerRadius);

      
        
        return layout;
    }

    function showRelationsChart(element) {
        var layout = element[0],
            characters = element[1],
           matrix = element[2];

           var colors = d3.scaleOrdinal(d3.schemeCategory20),
           opacityDefault = 0.8;
        /*.range(['#9C6744','#C9BEB9','#CFA07E','#C4BAA1','#C2B6BF','#121212','#8FB5AA','#85889E','#9C7989','#91919C','#242B27','#212429','#99677B','#36352B','#33332F','#2B2B2E','#2E1F13','#2B242A','#918A59','#6E676C','#6E4752','#6B4A2F',
          '#998476','#8A968D','#968D8A','#968D96','#CC855C', '#967860','#929488','#949278','#A0A3BD','#BD93A1','#65666B','#6B5745','#6B6664','#695C52','#56695E','#69545C','#565A69','#696043','#63635C','#636150','#333131','#332820',
          '#302D30','#302D1F','#2D302F','#CFB6A3','#362F2A', "#E7E1E4","#E7E1E4","#AA8999","#AA8999","#7A415D","#7A415D","#4F0629","#4F0629","#2A0014","#2A0014"]);
        
*/


          var group = svg.selectAll(".group")
          .data(layout.groups)
          .enter().append("g")
          .attr("class", "group")
          .on("mouseover", fade(.1))
         .on("mouseout", fade(opacityDefault)); 

              //  group arc
              var groupPath = group.append("path")
              .attr("id", function(d, i) { return "group" + i; })
              .attr("d", arc)
              .style("fill", function(d, i) { return colors(d.index); });

            // text label
            var groupText = group.append("text")
            .attr("class", "titles")
            .attr("dy", ".35em")
                       .attr("transform", function (d) {
          d.angle = (d.startAngle + d.endAngle) / 2;
          var r = "rotate(" + (d.angle * 180 / Math.PI - 90) + ")";
          var t = " translate(" + (innerRadius + 26) + ")";
          return r + t + (d.angle > Math.PI ? " rotate(180)" : " rotate(0)"); 
        })
        .attr("text-anchor", function (d) {
          return d.angle > Math.PI ? "end" : "begin"})

            //.attr("startOffset","20%")
            //.style("text-anchor","middle")
            .attr("xlink:href",function(d,i){return "#group"+i;})
            //tooltip
            .on("mouseover", function(d, i) {
              console.log(d);
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("<b>" + characters[i].name + "</b>: <br/> <br/>"  + characters[i].bio)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0) 
                      })


            .text(function(d,i){ return characters[i].name; });

              



              // Add chords
              var chord = svg.selectAll(".chord")
              .data(layout.chords)
              .enter().append("path")
              .attr("class", "chord")
              .style("fill", function(d) { return colors(d.source.index); })
              .attr("d", path);


              //Returns an event handler for fading a given chord group.
function fade(opacity) {
  return function(d,i) {
    svg.selectAll("path.chord")
        .filter(function(d) { return d.source.index !== i && d.target.index !== i; })
    .transition()
        .style("opacity", opacity);
  };
}//fade
                  
              }
           
      that.showRelationsChart = showRelationsChart;
      that.createRelationsChart = createRelationsChart;
        return that;

    
};
