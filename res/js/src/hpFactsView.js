/* eslint-env browser */
/* global EventPublisher */
/* global d3 */

var hp = hp || {};
hp.hpFactsView = function() {
    "use strict";
    var that = new EventPublisher(),
        size=1200;
       
    function test() {
        donutChart();
    }
    
    

//<!-- DONUT CHART MIT LABELS, HIER DIE MOVIES UND BOOKS SALES FIGURES EINBAUEN, SODASS BEIM KLICK AUF DEN "RANDOM-BUTTON"
//   DIE JEWEILS ANDEREN DATEN ANGEZEIGT WERDEN-->


//<script src="http://d3js.org/d3.v3.min.js"></script>
    var svg, color, radius;

    function donutChart() {
        svg = d3.select("#Chart4")
           .append("svg")
           .append("g")
        svg.append("g")
           .attr("class", "slices");
        svg.append("g")
           .attr("class", "labels");
        svg.append("g")
           .attr("class", "lines");
        var margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = Math.min(window.innerWidth, size) - margin.left - margin.right,
            height = Math.min(window.innerWidth, size)  - margin.top - margin.bottom;
        radius = Math.min(width, height)/2;
        color = d3.scale.ordinal()
           .domain(["Lorem ipsum", "dolor sit", "amet", "consectetur", "adipisicing", "elit", "sed", "do", "eiusmod", "tempor", "incididunt"])
           .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);
        svg.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
        change(randomData(color));
        d3.select(".randomize")
           .on("click", function(){
              change(randomData(color));
           });
    }
    function change(data) {
        var pie = d3.layout.pie()
           .sort(null)
           .value(function(d) {
              return d.value;
           });
        var arc = d3.svg.arc()
           .outerRadius(radius * 0.8)
           .innerRadius(radius * 0.4);
        var outerArc = d3.svg.arc()
           .innerRadius(radius * 0.9)
           .outerRadius(radius * 0.9);
        var key = function(d){ return d.data.label; };
       /* ------- PIE SLICES -------*/
       var slice = svg.select(".slices").selectAll("path.slice")
          .data(pie(data), key);
       slice.enter()
          .insert("path")
          .style("fill", function(d) { return color(d.data.label); })
          .attr("class", "slice");
       slice    
          .transition().duration(1000)
          .attrTween("d", function(d) {
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function(t) {
                return arc(interpolate(t));
             };
          })
       slice.exit()
          .remove();
       /* ------- TEXT LABELS -------*/
       var text = svg.select(".labels").selectAll("text")
          .data(pie(data), key);
       text.enter()
          .append("text")
          .attr("dy", ".35em")
          .text(function(d) {
             return d.data.label;
          });

       function midAngle(d){
          return d.startAngle + (d.endAngle - d.startAngle)/2;
       }
       text.transition().duration(1000)
          .attrTween("transform", function(d) {
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * (midAngle(d2) < Math.PI ? 1 : -1);
                return "translate("+ pos +")";
             };
          })
          .styleTween("text-anchor", function(d){
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function(t) {
                var d2 = interpolate(t);
                return midAngle(d2) < Math.PI ? "start":"end";
             };
          });
       text.exit()
          .remove();
       /* ------- SLICE TO TEXT POLYLINES -------*/
       var polyline = svg.select(".lines").selectAll("polyline")
          .data(pie(data), key);

       polyline.enter()
          .append("polyline");
       polyline.transition().duration(1000)
          .attrTween("points", function(d){
             this._current = this._current || d;
             var interpolate = d3.interpolate(this._current, d);
             this._current = interpolate(0);
             return function(t) {
                var d2 = interpolate(t);
                var pos = outerArc.centroid(d2);
                pos[0] = radius * 0.95 * (midAngle(d2) < Math.PI ? 1 : -1);
                return [arc.centroid(d2), outerArc.centroid(d2), pos];
             };       
          });

       polyline.exit()
          .remove();
    }
    
    
    function randomData (color){
       var labels = color.domain();
       return labels.map(function(label){
          return { label: label, value: Math.random() }
       });
    }


        ////////////////

   //       <!-- GROUPED BAR CHART WÖRTER, nach https://bl.ocks.org/mbostock/3887051-->

        /* für tooltip, der fehlt noch
        Harry Potter and the Sorcerer’s Stone
        Harry Potter and the Chamber of Secret
        Harry Potter and the Prisoner of Azkaban
        Harry Potter and the Goblet of Fire
        Harry Potter and the Order of the Phoenix
        Harry Potter and the Half-Blood Prince,
        Harry Potter and the Deathly Hallows */

        //<svg width="450" height="350"></svg>
        //<script src="https://d3js.org/d3.v4.min.js"></script>


    function createWordsChart(data) {

        var svg = d3.select('#Chart5'),
            margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = Math.min(window.innerWidth, size) - margin.left - margin.right,
            height = Math.min(window.innerWidth, size)  - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#1D8089","#CA295A","#E1822E","#71C929", "#A71944"]);

          var keys = data.columns.slice(1);

          x0.domain(data.map(function(d) { return d.title; }));
          x1.domain(keys).rangeRound([0, x0.bandwidth()]);
          y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

          g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
              .attr("transform", function(d) { return "translate(" + x0(d.title) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) { return {key: key, value: d[key]}; }); })
            .enter().append("rect")
              .attr("x", function(d) { return x1(d.key); })
              .attr("y", function(d) { return y(d.value); })
              .attr("width", x1.bandwidth())
              .attr("height", function(d) { return height - y(d.value); })
              .attr("fill", function(d) { return z(d.key); });

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x0));

          g.append("g")
              .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
              .attr("x", "40")
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")
              .attr("font-size", "30")
              .text("Count");

          var legend = g.append("g")
              .attr("font-family", "sans-serif")
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .text(function(d) { return d; });
    }   
      

//<!-- STACKED BAR CHART SATZZEICHEN, nach https://bl.ocks.org/mbostock/3886208-->
    
/* für tooltip, der fehlt noch
Harry Potter and the Sorcerer’s Stone
Harry Potter and the Chamber of Secret
Harry Potter and the Prisoner of Azkaban
Harry Potter and the Goblet of Fire
Harry Potter and the Order of the Phoenix
Harry Potter and the Half-Blood Prince,
Harry Potter and the Deathly Hallows */

//<svg width="450" height="350"></svg>
//<script src="https://d3js.org/d3.v4.min.js"></script>
    
    function createMarksChart(data) {
        var svg = d3.select('#Chart6'),
            margin = {top: 40, right: 20, bottom: 30, left: 40},
            width = Math.min(window.innerWidth, size) - margin.left - margin.right,
            height = Math.min(window.innerWidth, size)  - margin.top - margin.bottom,
            g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var x = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.05)
            .align(0.1);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#1D8089","#CA295A","#E1822E","#71C929", "#A71944"]);

        var keys = data.columns.slice(1);

        data.sort(function(a, b) { return b.total - a.total; });
          x.domain(data.map(function(d) { return d.title; }));
          y.domain([0, d3.max(data, function(d) { return d.total; })]).nice();
          z.domain(keys);


        g.append("g")
            .selectAll("g")
            .data(d3.stack().keys(keys)(data))
            .enter().append("g")
              .attr("fill", function(d) { return z(d.key); })
            .selectAll("rect")
            .data(function(d) { return d; })
            .enter().append("rect")
              .attr("x", function(d) { return x(d.data.title); })
              .attr("y", function(d) { return y(d[1]); })
              .attr("height", function(d) { return y(d[0]) - y(d[1]); })
              .attr("width", x.bandwidth());

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));


          g.append("g")
              .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
              .attr("x", 2)
              .attr("y", y(y.ticks().pop()) + 0.5)
              .attr("dy", "0.32em")
              .attr("fill", "#000")
              .attr("font-weight", "bold")
              .attr("text-anchor", "start")
              .text("Counts");

          var legend = g.append("g")
              .attr("font-family", "sans-serif")
              .attr("text-anchor", "end")
            .selectAll("g")
            .data(keys.slice().reverse())
            .enter().append("g")
              .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });


          legend.append("rect")
              .attr("x", width - 19)
              .attr("width", 19)
              .attr("height", 19)
              .attr("fill", z);

          legend.append("text")
              .attr("x", width - 24)
              .attr("y", 9.5)
              .attr("dy", "0.32em")
              .text(function(d) { return d; });
        
    }

    that.createWordsChart = createWordsChart;
    that.createMarksChart = createMarksChart;
    that.test = test;
    return that;

};
