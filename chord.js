 //Grundgerüst 
var width = 720,
height = 720,
outerRadius = Math.min(width, height) / 2 - 10,
innerRadius = outerRadius - 24;
 
var formatPercent = d3.format(".1%");
 
var arc = d3.svg.arc()
.innerRadius(innerRadius)
.outerRadius(outerRadius);
 
var layout = d3.layout.chord()
.padding(.04)
.sortSubgroups(d3.descending)
.sortChords(d3.ascending);
 
var path = d3.svg.chord()
.radius(innerRadius);
 
var svg = d3.select("body").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("id", "circle")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
 
svg.append("circle")
.attr("r", outerRadius);

 
/*
d3.json("res/data/graph.json", function(error, graph, matrix){
  if (error) {
    console.log(error);
  }

  var links = graph.links;

  links.forEach(function(d){
    d.source = +d.source;
    d.target = +d.target;
});
  console.log(graph);
  layout.matrix(matrix);*/


 //Datensätze einlesen

d3.queue()
  .defer(d3.csv, "res/data/characters.csv") 
  .defer(d3.csv, "res/data/relations.csv") 
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
  

 
/* MATRIX??
    var matrix = [],  // <-- hierhin sollen die Daten
        info = d3.keys(relations[0]);

    relations.forEach(function(row) {
        var mrow = [];
        info.forEach(function(c) {
            mrow.push(Number(row[c]));
        });
        matrix.push(mrow);
    });
    console.log(matrix);
  
 */
 /* MATRIX ???

d3.json("matrix.json", function(matrix) {
 
// Compute the chord layout.
layout.matrix(matrix);

*/
var matrix = [

[2,0,0,1,0,0,1,0,1,1,0,1,0,1,1,1,0,1,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0],
[0,0,0,0,0,0,6,0,0,0,0,0,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
[1,0,0,1,0,0,4,0,0,1,0,1,0,1,1,1,0,1,0,0],
[0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0],
[0,0,1,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0],
[0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0],
[0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,1,1,0],
[1,0,0,1,0,0,1,0,1,1,0,9,0,0,1,1,0,1,1,0],
[1,0,0,1,0,0,1,0,1,1,0,1,0,1,0,1,0,1,1,0],
[1,0,0,1,0,0,1,0,1,1,0,1,0,7,1,0,0,1,0,0],
[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0],
[0,0,1,1,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0],
[0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0],
[0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0]
];

layout.matrix(matrix);



var group = svg.selectAll(".group")
.data(layout.groups)
.enter().append("g")
.attr("class", "group")
.on("mouseover", mouseover);
 
//  mouseover title

 
//  group arc
var groupPath = group.append("path")
.attr("id", function(d, i) { return "group" + i; })
.attr("d", arc)
.style("fill", function(d, i) { return characters[i].color; });
 
// text label
var groupText = group.append("text")
.attr("x", 6)
.attr("dy", 15);
 
groupText.append("textPath")
.attr("xlink:href", function(d, i) { return "#group" + i; })
.text(function(d, i) { return characters[i].name; });
 
 
// Add chords
var chord = svg.selectAll(".chord")
.data(layout.chords)
.enter().append("path")
.attr("class", "chord")
.style("fill", function(d) { return characters[d.source.index].color; })
.attr("d", path);
 

/*Add an elaborate mouseover title for each chord.
 chord.append("title").text(function(d) {
 return cities[d.source.index].name
 + " → " + cities[d.target.index].name
 + ": " + formatPercent(d.source.value)
 + "\n" + cities[d.target.index].name
 + " → " + cities[d.source.index].name
 + ": " + formatPercent(d.target.value);
 });*/
 
function mouseover(d, i) {
chord.classed("fade", function(p) {
return p.source.index != i
&& p.target.index != i;
});
}
}