/* eslint-env browser */
/* global EventPublisher */
/* global d3 */
/**
 * Hier werden die Hintergrunddaten berechnet
 */
var hp = hp || {};
hp.hpSpellView = function() {
    "use strict";
    var that = new EventPublisher(),
        div,
        colors = ["#bf0542", "#6cd8ca", "#ea7c54", "#66d67a", "#70b2ff", "#a637bf", "#d134a2"];

    function createSpellChart() {

        // Define the div for the tooltip
        div = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        d3.select(".openPopup").on("click", function() {
            that.notifyAll("loadBubblePopup");
        });
    }

    function createSVG(data, area) {
        var root = data[0],
            bookNr = data[1],
            bookString,
            color;
        if (bookNr == "all") {
            createSpellSVG(root, area);
        } else {
            if (bookNr == 4) {
                bookString = "dh";
                color = colors[6];
            } else if (bookNr == 5) {
                bookString = "hbp";
                color = colors[5];
            } else if (bookNr == 6) {
                bookString = "ootp";
                color = colors[4];
            } else if (bookNr == 7) {
                bookString = "gof";
                color = colors[3];
            } else if (bookNr == 8) {
                bookString = "poa";
                color = colors[2];
            } else if (bookNr == 9) {
                bookString = "cos";
                color = colors[1];
            } else if (bookNr == 10) {
                bookString = "ps";
                color = colors[0];
            } else {
                bookString = "all";
            }
            spellsByBook(root, bookString, bookNr, color, area);
        }
    }

    function createSpellSVG(root, area) {

        //SVG erstellen
        deleteChart(area);
        var selection;

        if (area == "preview") selection = d3.select("#Chart2");
        else selection = d3.select("#Chart2Popup");


        var g = selection.append("g").attr("transform", "translate(2,2)"),
            colorCircles = d3.scaleSequential()
            .domain([0, 15])
            .interpolator(d3.interpolateRainbow);

        selection.attr("opacity", 1);

        var nodes = g.selectAll(".node")
            .data(root.descendants().slice(1))
            .enter().append("g")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node";
            })
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        nodes.append("circle")
            .style("stroke-width", 2).style("stroke", " #aeb4bf")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node circle";
            })
            .attr("r", 0)
            .style("fill", function(d) {
                return colorCircles(d.value)
            })
            .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", 5).style("stroke", " #aeb4bf");
                div.transition()
                    .attr("id", "pie")
                    .duration(200)
                    .style("opacity", .9)
                    .style("width", "220px")
                    .style("text-align", "center");
                div.html("<b>" + d.data.name + "</b> <br/>Total: " + d.value + " <br/>" + d.data.effect +
                        "<br/> Classification: " + d.data.classification)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 150) + "px");




                //-------Start of piechart------- (http://www.cagrimmett.com/til/2016/08/19/d3-pie-chart.html)
                var width = "150",
                    height = "150",
                    radius = Math.min(width, height) / 2;
                var color = d3.scaleOrdinal()
                    .range(colors);


                //Datenzuweisung
                var data = [{
                        "name": "ps",
                        "count": d.data.ss
                    },
                    {
                        "name": "cos",
                        "count": d.data.cos
                    },
                    {
                        "name": "poa",
                        "count": d.data.poa
                    },
                    {
                        "name": "gof",
                        "count": d.data.gof
                    },
                    {
                        "name": "ootp",
                        "count": d.data.ootp
                    },
                    {
                        "name": "hbp",
                        "count": d.data.hbp
                    },
                    {
                        "name": "dh",
                        "count": d.data.dh
                    }
                ];

                var pie = d3.pie().value(function(e) {
                    return e.count;
                })(
                    data
                );

                var arc = d3.arc()
                    .outerRadius(radius - 10)
                    .innerRadius(0);

                var labelArc = d3.arc()
                    .outerRadius(radius - 40)
                    .innerRadius(radius - 40);

                var svg = d3.select("#pie")
                    .append("svg")
                    .attr("width", "200px")
                    .attr("height", "200px")
                    .append("g")
                    .attr("transform", "translate(" + (width / 2 + 30) + "," + (height / 2 + 20) + ")");

                var g = svg.selectAll("arc")
                    .data(pie)
                    .enter().append("g")
                    .attr("class", "arc");

                g.append("path")
                    .attr("d", arc)
                    .style("stroke-width", 1)
                    .style("stroke", "white")
                    .style("fill", function(d) {
                        return color(d.data.name)
                    });


                //Text innerhalb den Kuchenteilen
                g.append("text")
                    .style("text-anchor", "middle")
                    .attr("transform", function(d) {
                        return "translate(" + labelArc.centroid(d) + ")";
                    })
                    .text(function(d) {
                        if (d.data.count > 0) {
                            return d.data.count
                        }
                    })
                    .style("fill", "white")
                    .style("font-size", "100%");

                //Text außerhalb der Kuchenteile
                g.append("text")
                    .style("fill", "white")
                    .attr("transform", function(d) {
                        var c = arc.centroid(d),
                            x = c[0],
                            y = c[1],
                            // pythagorean theorem for hypotenuse
                            h = Math.sqrt(x * x + y * y);
                        return "translate(" + (x / h * radius) + ',' +
                            (y / h * radius) + ")";
                    })
                    .attr("text-anchor", function(d) {
                        // are we past the center?
                        return (d.endAngle + d.startAngle) / 2 > Math.PI ?
                            "end" : "start";
                    })
                    .text(function(d) {
                        if (d.data.count > 0) {
                            return d.data.name
                        }
                    });
            })
            //-------End of piechart-------

            .on("mouseout", function() {
                d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        var radius = [];

        d3.selectAll(".leaf.node.circle")
            .transition()
            .duration(2000)
            .attr("r", function(d) {
                radius.push(d.r);
                return d.r;
            });

        nodes.append("text")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node text";
            })
            .attr("font-size", 0 + "px")
            .style("text-anchor", "middle")
            .text(function(d) {
                if (d.data.value > 3) {
                    return d.data.name
                }
            });

        d3.selectAll(".leaf.node.text")
            .transition()
            .duration(2100)
            .attr("font-size", 30 + "px");

        setTimeout(function() {
            minText(radius)
        }, 2100);

    } //End of CreateSpellSVG()


    // erstellt book sorted bubble chart
    function spellsByBook(root, sortString, bookNr, color, area) {
        deleteChart(area);

        //hier neues Chart
        var selection;

        if (area == "preview") selection = d3.select("#Chart2");
        else selection = d3.select("#Chart2Popup");

        var g = selection.append("g").attr("transform", "translate(2,2)");

        selection.attr("opacity", 1);

        var nodes = g.selectAll(".node")
            .data(root.descendants().slice(1))
            .enter().append("g")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node";
            })
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });

        //hier Bubble anpassungen
        nodes.append("circle")
            .style("stroke-width", 2).style("stroke", " #aeb4bf")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node " + sortString;
            })
            .attr("r", 0)
            .style("fill", color)
            .on("mouseover", function(d) {
                d3.select(this).style("stroke-width", 5).style("stroke", " #aeb4bf");
                div.transition()
                    .attr("id", "pie")
                    .duration(200)
                    .style("opacity", .9)
                    .style("width", "220px")
                    .style("text-align", "center");
                div.html("<b>" + d.data.name + "</b> <br/> Total: " +
                        Object.values(d.data)[bookNr] +
                        " <br/>" + d.data.effect +
                        "<br/> Classification: " + d.data.classification)
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY - 80) + "px");
            })
            .on("mouseout", function() {
                d3.select(this).style("stroke-width", 2).style("stroke", " #aeb4bf");
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
        var radius = [];

        d3.selectAll(".leaf.node." + sortString)
            .transition()
            .duration(2000)
            .attr("r", function(d) {
                radius.push(d.r);
                return d.r;
            });

        nodes.append("text")
            .attr("class", function(d) {
                return d.children ? "node" : "leaf node text";
            })
            .attr("font-size", 0 + "px")
            .style("text-anchor", "middle")
            .text(function(d) {
                var input = d.data,
                    count = Object.values(input)[bookNr];
                if (count > 0) {
                    return d.data.name
                }
            })
            .transition()
            .duration(2100)
            .style("font-size", function(d) {
                return Math.min(d.r / 3, (2 * d.r - 8) / this.getComputedTextLength() * 18) + "px";
            });

        setTimeout(function() {
            minText(radius)
        }, 2100);
    }

    function minText(radius) {
        d3.selectAll(".leaf.node.text").each(function(d, i) {
            if (this.getComputedTextLength() > radius[i] * 2 - 10) {
                this.style.fontSize = "97%";
                if (this.getComputedTextLength() > radius[i] * 2) {
                    this.innerHTML = "";
                }
            }
        });
    }

    function deleteChart(area) {
        var oldChart;
        if (area == "preview") oldChart = document.getElementById("Chart2");
        else oldChart = document.getElementById("Chart2Popup");

        while (oldChart.firstChild) {
            oldChart.removeChild(oldChart.firstChild);
        }
    }

    function fadeOut(book) {
        if (d3.select("#Chart2").selectAll("g").size() > 1) {
            d3.select("#Chart2")
                .transition()
                .duration(850)
                .attr("opacity", 0);

            setTimeout(function() {
                that.notifyAll("fadedOut", book)
            }, 1000);
        }

    }

    function popupFadeOut(book) {
        if (d3.select("#Chart2Popup").selectAll("g").size() > 1) {
            d3.select("#Chart2Popup")
                .transition()
                .duration(850)
                .attr("opacity", 0);

            setTimeout(function() {
                that.notifyAll("popupFadedOut", book)
            }, 1000);
        }
    }

    that.popupFadeOut = popupFadeOut;
    that.createSpellChart = createSpellChart;
    that.createSVG = createSVG;
    that.fadeOut = fadeOut;
    that.spellsByBook = spellsByBook;
    return that;
};