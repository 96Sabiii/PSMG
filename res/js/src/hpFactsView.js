/* eslint-env browser */
/* global EventPublisher */
/* global d3 */

var hp = hp || {};
hp.hpFactsView = function() {
    "use strict";
    var that = new EventPublisher(),
        size=1200,
        width = 280,
        div;


        ////////////////

   //       <!-- GROUPED BAR CHART WÖRTER, nach https://bl.ocks.org/mbostock/3887051-->


    function createWordsChartPopup(data) {
        var svg = d3.select('#Chart5Popup'),
            popupClass = "wordsPopupG";

        designWordsChart(data, svg, popupClass);
        //anpassen welches svg close
        d3.select(".close").on("click", function() { d3.select("." + popupClass).remove(); });
    }

    function createWordsChart(data) {

        var svg = d3.select('#Chart5');

        designWordsChart(data, svg, "");

        //dazugehöriges Popup implementieren
        d3.select(".openPopup1").on("click", function() { that.notifyAll("loadWordsPopup"); });
    }

    function designWordsChart(data, svg, popupClass) {
        var margin = {top: 80, right: 20, bottom: 30, left: 80},
            width = Math.min(window.innerWidth, size) - margin.left - margin.right,
            height = Math.min(window.innerWidth, size)  - margin.top - margin.bottom,
            g = svg.append("g")
                .attr("class", popupClass)
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var x0 = d3.scaleBand()
            .rangeRound([0, width])
            .paddingInner(0.1);

        var x1 = d3.scaleBand()
            .padding(0.05);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var z = d3.scaleOrdinal()
            .range(["#1D8089","#CA295A","#E1822E"]);

          var keys = data.columns.slice(1);

            // Define the div for the tooltip
          div = d3.select("body").append("div")
              .attr("class", "tooltip")
              .style("opacity", 0);

          x0.domain(data.map(function(d) { return d.title; }));
          x1.domain(keys).rangeRound([0, x0.bandwidth()]);
          y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

          g.append("g")
            .selectAll("g")
            .data(data)
            .enter().append("g")
              .attr("transform", function(d) { return "translate(" + x0(d.title) + ",0)"; })
            .selectAll("rect")
            .data(function(d) { return keys.map(function(key) {return {title: d.title, key: key, value: d[key]}; }); })
            .enter().append("rect")
              .attr("class", "rect1")
              .attr("x", function(d) { return x1(d.key); })
              .attr("y", function(d){return 0;})
              .attr("width", x1.bandwidth())
              .attr("height", function(d){return 0;})
              // .attr("height", function(d) { return height - y(d.value); })
              .attr("fill", function(d) { return z(d.key); })
              .on("mouseover", function(d) {
                  d3.select(this).style("stroke-width", 5).style("stroke", " #aeb4bf");
                  div.transition()
                      .duration(200)
                      .style("opacity", .9)
                      .style("width","220px")
                    //  .style("height","250px")
                      .style("text-align","center");
                  div.html("<b>" + d.title + "</b> <br/>" + d.key +  ": " + d.value)
                            // .style("left", (d3.event.pageX) + "px")
                            // .style("top", (d3.event.pageY - 28) + "px");
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");
                })
                .on("mouseout", function(d) {
                  d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
          });


          //Animation barchart1
          d3.selectAll(".rect1")
            .transition()
            .delay(function (d, i) { return i*100; })
            .duration(1500)
            .attr("y", function (d, i) { return y(d.value); })
            .attr("height", function(d) { return height - y(d.value); });

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
              .attr("text-anchor", "start")
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

    function createMarksChartPopup(data) {
        var svg = d3.select('#Chart6Popup'),
            popupClass = "marksPopupG";

        designMarksChart(data, svg, popupClass);
        //anpassen welches svg close
        d3.select(".close").on("click", function() { d3.select("." + popupClass).remove(); });
    }

    function createMarksChart(data) {
        var svg = d3.select('#Chart6');
        designMarksChart(data, svg, "");

        //dazugehöriges Popup implementieren
        d3.select(".openPopup2").on("click", function() { that.notifyAll("loadMarksPopup"); });
    }

    function designMarksChart(data, svg, popupClass) {
        var margin = {top: 80, right: 20, bottom: 30, left: 120},
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
              .attr("class", "rect2")
              .attr("x", function(d) { return x(d.data.title); })
              .attr("y", function(d) { return 0 })
              .attr("height", 0)
              // .attr("height", function(d) { return y(d[0]) - y(d[1]); })
              .attr("width", x.bandwidth())
                .on("mouseover", function(d, i) {
                  d3.select(this).style("stroke-width", 5).style("stroke", " #aeb4bf");
                  div.transition()
                      .duration(200)
                      .style("opacity", .9)
                      .style("width","220px")
                    //  .style("height","250px")
                      .style("text-align","center");
                    let count = d[1]-d[0];
                  div.html("<b>" + d.data.title + "</b> <br/> Anzahl: " + count)
                            // .style("left", (d3.event.pageX) + "px")
                            // .style("top", (d3.event.pageY - 28) + "px");
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");
                })
                .on("mouseout", function(d) {
                  d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
            });

        //Animation barchart2
        d3.selectAll(".rect2")
            .transition()
            .delay(function (d, i) { return i*100; })
            .duration(1000)
            .attr("y", function (d, i) { return y(d[1]); })
            .attr("height", function(d) { return y(d[0]) - y(d[1]); });

          g.append("g")
              .attr("class", "axis")
              .attr("transform", "translate(0," + height + ")")
              .call(d3.axisBottom(x));


          g.append("g")
              .attr("class", "axis")
              .call(d3.axisLeft(y).ticks(null, "s"))
            .append("text")
              .attr("x", 2)
              .attr("dy", "0.2em")
              .attr("text-anchor", "start")
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


   //  <!--DASHBOARD VERKAUFSZAHLEN nach http: //bl.ocks.org/NPashaP/96447623ef4d342ee09b-->

    function dashboard(id, fData){


        var barColor = "#75B540";
        function segColor(c){ return {USA:"#1D8089", Overseas:"#CA295A", Worldwide:"#E1822E"}[c]; }

        // compute total for each state.

        fData.forEach(function(d){d.total=d.freq.USA+d.freq.Overseas+d.freq.Worldwide;});

        d3.select("#openSalesPopup").on("click", function() {that.notifyAll("loadSalesPopup"); });
        d3.select("#salesClose").on("click", function() { deleteChart() });

        // function to handle histogram.
        function histoGram(fD){
            var hG={},    hGDim = {t: 30, r: 0, b: 30, l: 0};
            hGDim.w = width - hGDim.l - hGDim.r,
            hGDim.h = 200 - hGDim.t - hGDim.b;

            //create svg for histogram.
            var hGsvg = d3.select(id).append("svg")
               // .attr("class", "histogrammPopup")
                .attr("class", "histo")
                .attr("width", hGDim.w)
                .attr("height", hGDim.h + hGDim.t + hGDim.b)
                .append("g")
                .attr("transform", "translate(" + hGDim.l + "," + hGDim.t + ")");

            // create function for x-axis mapping.
            var x = d3.scale.ordinal().rangeRoundBands([0, hGDim.w], 0.1)
                    .domain(fD.map(function(d) { return d[0]; }));

            // Add x-axis to the histogram svg.
            hGsvg.append("g").attr("class", "x axis")
                .attr("transform", "translate(0," + hGDim.h + ")")
                .call(d3.svg.axis().scale(x).orient("bottom"));

            // Create function for y-axis map.
            var y = d3.scale.linear().range([hGDim.h, 0])
                    .domain([0, d3.max(fD, function(d) { return d[1]; })]);

            // Create bars for histogram to contain rectangles and freq labels.
            var bars = hGsvg.selectAll(".bar").data(fD).enter()
                    .append("g").attr("class", "bar");

            //create the rectangles.
            bars.append("rect")
                .attr("x", function(d) { return x(d[0]); })
                .attr("y", function(d) { return y(d[1]); })
                .attr("width", x.rangeBand())
                .attr("height", function(d) { return hGDim.h - y(d[1]); })
                .attr('fill',barColor)
                .on("mouseover",mouseover)// mouseover is defined below.
                .on("mouseout",mouseout);// mouseout is defined below.

            //Create the frequency labels above the rectangles.
/*            bars.append("text").text(function(d){ return d3.format(",")(d[1])})
                .attr("x", function(d) { return x(d[0])+x.rangeBand()/2; })
                .attr("y", function(d) { return y(d[1])-5; })
                .attr("text-anchor", "middle");*/


            function mouseover(d){  // utility function to be called on mouseover.
                // filter for selected state.
                var st = fData.filter(function(s){ return s.name == d[0];})[0],
                    nD = d3.keys(st.freq).map(function(s){ return {type:s, freq:st.freq[s]};});

                // call update functions of pie-chart and legend.
                pC.update(nD);
                leg.update(nD);

                  div.transition()
                      .duration(200)
                      .style("opacity", .9)
                      .style("width","220px")
                    //  .style("height","250px")
                      .style("text-align","center");
                  div.html("<b>" + d[0] + "</b> <br/> " + d3.format(",")(d[1]))
                            // .style("left", (d3.event.pageX) + "px")
                            // .style("top", (d3.event.pageY - 28) + "px");
                            .style("left", (d3.event.pageX) + "px")
                            .style("top", (d3.event.pageY - 50) + "px");

            }


            function mouseout(d){    // utility function to be called on mouseout.
                // reset the pie-chart and legend.
                pC.update(tF);
                leg.update(tF);
                div.transition()
                  .duration(500)
                  .style("opacity", 0);
            }

            // create function to update the bars. This will be used by pie-chart.
            hG.update = function(nD, color){
                // update the domain of the y-axis map to reflect change in frequencies.
                y.domain([0, d3.max(nD, function(d) { return d[1]; })]);

                // Attach the new data to the bars.
                var bars = hGsvg.selectAll(".bar").data(nD);

                // transition the height and color of rectangles.
                bars.select("rect").transition().duration(500)
                    .attr("y", function(d) {return y(d[1]); })
                    .attr("height", function(d) { return hGDim.h - y(d[1]); })
                    .attr("fill", color);

                // transition the frequency labels location and change value.
                bars.select("text").transition().duration(500)
                    .text(function(d){ return d3.format(",")(d[1])})
                    .attr("y", function(d) {return y(d[1])-5; });
            }
            return hG;
        }

        // function to handle pieChart.
        function pieChart(pD){
            var pC ={},    pieDim ={w:200, h: 200};
            pieDim.r = Math.min(pieDim.w, pieDim.h) / 2;

            // create svg for pie chart.
            var piesvg = d3.select(id).append("svg")
                .attr("width", pieDim.w).attr("height", pieDim.h).append("g")
                .attr("class", "salesPie")
                .attr("transform", "translate("+pieDim.w/2+","+pieDim.h/2+")");

            // create function to draw the arcs of the pie slices.
            var arc = d3.svg.arc().outerRadius(pieDim.r - 10).innerRadius(0);

            // create a function to compute the pie slice angles.
            var pie = d3.layout.pie().sort(null).value(function(d) { return d.freq; });

            // Draw the pie slices.
            piesvg.selectAll("path").data(pie(pD)).enter().append("path").attr("d", arc)
                .each(function(d) { this._current = d; })
                .style("fill", function(d) { return segColor(d.data.type); })
                .on("click",mouseover);
                //.on("mouseout",mouseout);

            // create function to update pie-chart. This will be used by histogram.
            pC.update = function(nD){
                piesvg.selectAll("path").data(pie(nD)).transition().duration(500)
                    .attrTween("d", arcTween);
            }
            // Utility function to be called on mouseover a pie slice.
            function mouseover(d){
                // call the update function of histogram with new data.
                hG.update(fData.map(function(v){
                    return [v.name,v.freq[d.data.type]];}),segColor(d.data.type));
            }
            //Utility function to be called on mouseout a pie slice.
            function mouseout(d){
                // call the update function of histogram with all data.
                hG.update(fData.map(function(v){
                    return [v.name,v.total];}), barColor);
            }
            // Animating the pie-slice requiring a custom function which specifies
            // how the intermediate paths should be drawn.
            function arcTween(a) {
                var i = d3.interpolate(this._current, a);
                this._current = i(0);
                return function(t) { return arc(i(t));    };
            }
            return pC;
        }

        // function to handle legend.
        function legend(lD){
            var leg = {};

            // create table for legend.
            var legend = d3.select(id).append("table").attr('class','legend');

            // create one row per segment.
            var tr = legend.append("tbody").style("width", width).selectAll("tr").data(lD).enter().append("tr");

            // create the first column for each segment.
            tr.append("td").append("svg").attr("width", '16').attr("height", '16').append("rect")
                .attr("width", '16').attr("height", '16')
          .attr("fill",function(d){ return segColor(d.type); });

            // create the second column for each segment.
            tr.append("td").text(function(d){ return d.type;});

            // create the third column for each segment.
            tr.append("td").attr("class",'legendFreq')
                .text(function(d){ return d3.format(",")(d.freq);});

            // create the fourth column for each segment.
            tr.append("td").attr("class",'legendPerc')
                .text(function(d){ return getLegend(d,lD);});

            // Utility function to be used to update the legend.
            leg.update = function(nD){
                // update the data attached to the row elements.
                var l = legend.select("tbody").selectAll("tr").data(nD);

                // update the frequencies.
                l.select(".legendFreq").text(function(d){ return d3.format(",")(d.freq);});

                // update the percentage column.
                l.select(".legendPerc").text(function(d){ return getLegend(d,nD);});
            }

            function getLegend(d,aD){ // Utility function to compute percentage.
                return d3.format("%")(d.freq/d3.sum(aD.map(function(v){ return v.freq; })));
            }

            return leg;
        }

        // calculate total frequency by segment for all state.
           var tF = ['USA','Overseas','Worldwide'].map(function(d){
            return {type:d, freq: d3.sum(fData.map(function(t){ return t.freq[d];}))};
        });

        // calculate total frequency by state for all segment.
        var sF = fData.map(function(d){return [d.name,d.total];});

        var hG = histoGram(sF), // create the histogram.
            pC = pieChart(tF), // create the pie-chart.
            leg= legend(tF);  // create the legend.

        d3.select(id).append("a")
           // .attr("class", "histogrammPopup")
            .attr("class", "button")
            .append("text")
            .text("Total");

    }

    function deleteChart() {
        var chart = document.getElementById("salesPopup");

        while (chart.firstChild) {
            chart.removeChild(chart.firstChild);
        }
    }


    that.createWordsChartPopup = createWordsChartPopup;
    that.createMarksChartPopup = createMarksChartPopup;
    that.createWordsChart = createWordsChart;
    that.createMarksChart = createMarksChart;
    that.dashboard = dashboard;
    return that;

};
