/* eslint-env browser */
/* global EventPublisher */
/* global d3 */

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
    m = 150,
    size = 1200;


  function createRelationsChart() {
  //Grundgerüst erstellen
  var margin = {left:m, top:m, right:m, bottom:m},
  width = Math.min(window.innerWidth, size) - margin.left - margin.right,
  height = Math.min(window.innerWidth, size) - margin.top - margin.bottom;
  innerRadius = Math.min(width, height) * .39;
  outerRadius = innerRadius + 15;

  arc = d3.svg.arc()
  .innerRadius(innerRadius *1.01) //Abstand zwischen innerem und äußerem Kreis
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


    var colors =  d3.scaleSequential()
    .domain([75, 100])
    .interpolator(d3.interpolateRainbow),
    opacityDefault = 0.8;


    var group = svg.selectAll(".group")
    .data(layout.groups)
    .enter().append("g")
    .attr("class", "group")
    .on("mouseover", fadeOut(.1))
    .on("mouseout", fadeOut(opacityDefault));


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
    return r + t + (d.angle > Math.PI ? " rotate(180)" : " rotate(0)");})
  .style("fill", function(d, i) { return colors(d.index); })
  
  .attr("text-anchor", function (d) {
    return d.angle > Math.PI ? "end" : "begin"})
  .attr("xlink:href",function(d,i){return "#group"+i;})

  //tooltip
  .on("mouseover", function(d, i) {
    console.log(d);
    div.transition()
    .duration(200)
    .style("opacity", .9);
    div.html("<b>" + characters[i].name + "</b>: <br/> <br/>"  + characters[i].bio + characters[i].link_image )
    .style("left", (d3.event.pageX) + "px")
    .style("top", (d3.event.pageY - 28) + "px");})
  .on("mouseout", function(d) {
    div.transition()
    .duration(500)
    .style("opacity", 0)})

  .text(function(d,i){ return characters[i].name; });


  // Add chords
  var chord = svg.selectAll(".chord")
  .data(layout.chords)
  .enter().append("path")
  .attr("class", "chord")
  .style("fill", function(d) { return colors(d.source.index); })
  .attr("d", path);



      
    //Pop-up nach https://codepen.io/rachel_web/pen/YXMEqO
    function popupOpenClose(popup) {


      if ($(".wrapper").length == 0){
        $(popup).wrapInner("<div class='wrapper'></div>");
      }
      
      // Open popup 
      $(popup).show();
      

      // Close popup if user clicks on background ->>>> Funktioniert nicht?
      $(popup).click(function(e) {
        if ( e.target == this ) {
          if ($(popup).is(':visible')) {
            $(popup).hide();
          }
        }
      });

      // Close popup and remove errors if user clicks on cancel or close buttons 
      $(popup).find("button[id=close]").on("click", function() {
        if ($(".formElementError").is(':visible')) {
          $(".formElementError").remove();
        }
        $(popup).hide();
      });
    }

    $(document).ready(function () {
      $("[data-js=open]").on("click", function() {
        popupOpenClose($(".popup"));
      });
    });

      }//Pop-up Ende


      
    //Returns an event handler for fading a given chord group.
  function fadeOut(opacity) {
      console.log("fade");
    return function(d,i) {
      svg.selectAll("path.chord")
      .filter(function(d) { return d.source.index !== i && d.target.index !== i; })
      .transition()
      .style("opacity", opacity);
    };
  




  }

  that.showRelationsChart = showRelationsChart;
  that.createRelationsChart = createRelationsChart;
  return that;

  };
