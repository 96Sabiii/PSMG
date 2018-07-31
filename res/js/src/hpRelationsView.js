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
            var margin = {
                    left: 0,
                    top: 0,
                    right: 250,
                    bottom: m
                },
                width = Math.min(window.innerWidth - 300, size) - margin.left - margin.right,
                height = Math.min(window.innerWidth - 300, size) - margin.top - margin.bottom;
            innerRadius = Math.min(width, height) * .39;
            outerRadius = innerRadius + 15;

            arc = d3.svg.arc()
                .innerRadius(innerRadius * 1.01) //Abstand zwischen innerem und äußerem Kreis
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


            svg = d3.select("#relationsChart").append("svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("id", "circle")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

            svg.append("circle")
                .attr("r", outerRadius);

            d3.select(".openPopup").on("click", function() {
                that.notifyAll("loadPopup");
            });
            d3.select(".close").on("click", function() {
                d3.select(".popupSVG").remove();
            });


            return layout;

        }


        function showRelationsChart(element) {
            var layout = element[0],
                characters = element[1];


            var colors = d3.scaleSequential()
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
                .attr("id", function(d, i) {
                    return "group" + i;
                })
                .attr("d", arc)
                .style("fill", function(d, i) {
                    return colors(d.index);
                });




            // text label
            var groupText = group.append("text")
                .attr("class", "titles")
                .attr("dy", ".35em")
                .attr("transform", function(d) {
                    d.angle = (d.startAngle + d.endAngle) / 2;
                    var r = "rotate(" + (d.angle * 180 / Math.PI - 90) + ")";
                    var t = " translate(" + (innerRadius + 26) + ")";
                    return r + t + (d.angle > Math.PI ? " rotate(180)" : " rotate(0)");
                })
                .style("fill", function(d, i) {
                    return colors(d.index);
                })

                .attr("text-anchor", function(d) {
                    return d.angle > Math.PI ? "end" : "begin"
                })
                .attr("xlink:href", function(d, i) {
                    return "#group" + i;
                })

                //tooltip
                .on("mouseover", function(d, i) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>" + characters[i].name + "</b>: <br/> <br/>" + characters[i].bio)
                        .style("left", (d3.event.pageX) + "px")
                        .style("top", (d3.event.pageY - 28) + "px");
                })
                .on("mouseout", function(d) {
                    div.transition()
                        .duration(500)
                        .style("opacity", 0)
                })

                .text(function(d, i) {
                    return characters[i].name;
                });


            // Add chords
            var chord = svg.selectAll(".chord")
                .data(layout.chords)
                .enter().append("path")
                .attr("class", "chord")
                .style("fill", function(d) {
                    return colors(d.source.index);
                })
                .attr("d", path);
        }




        //Returns an event handler for fading a given chord group.
        function fadeOut(opacity) {
            return function(d, i) {
                svg.selectAll("path.chord")
                    .filter(function(d) {
                        return d.source.index !== i && d.target.index !== i;
                    })
                    .transition()
                    .style("opacity", opacity);
            };

        }



        function createPopupRelationsChart() {
            //Grundgerüst erstellen
            // var margin = {left:m, top:m, right:m, bottom:m},
            var margin = {
                    left: m,
                    top: 0,
                    right: 400,
                    bottom: 300
                },
                width = Math.min(window.innerWidth - 300, size) - margin.left - margin.right,
                height = Math.min(window.innerWidth - 300, size) - margin.top - margin.bottom;
            innerRadius = Math.min(width, height) * .39;
            outerRadius = innerRadius + 15;


            arc = d3.svg.arc()
                .innerRadius(innerRadius * 1.01) //Abstand zwischen innerem und äußerem Kreis
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


            svg = d3.select("#relationsChartPopup").append("svg")
                .attr("class", "popupSVG")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("id", "circle")
                .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 2 + margin.top) + ")");

            svg.append("circle")
                .attr("r", outerRadius);


            return layout;
        }

        that.createPopupRelationsChart = createPopupRelationsChart
        that.showRelationsChart = showRelationsChart;
        that.createRelationsChart = createRelationsChart;
        return that;

    };