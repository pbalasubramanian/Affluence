import * as d3 from 'd3';

function barchart(ydataset, xdataset) {
    //console.log(ydataset);

    // console.log(xdataset);

    d3.select('.bar-chart').selectAll('rect').remove();
    d3.select('.bar-chart').selectAll('g').remove();
    d3.select('.bar-chart').selectAll('text').remove();

    var svgWidth = 1000, svgHeight = 600, barPadding = 5;
    var barWidth = ((svgWidth-50) / ydataset.length);

    // console.log(ydataset.length);
    // console.log(barWidth);

    var svg = d3.select('.bar-chart')
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    // var yScale = d3.scaleLinear()
    //     .domain([0, d3.max(ydataset)])
    //     .range([0, svgHeight]);

    // var xScale = d3.scaleLinear()
    //     .domain([0, d3.max(ydataset)])
    //     .range([0, svgWidth]);

    var xScale = d3.scaleOrdinal()
        .domain(xdataset)
        .range([0, svgWidth]);


    // var xScale = d3.scale.ordinal().
    //     rangeRoundBands([0, svgWidth]);
    // var x_axis = d3.svg.axis().scale(xScale).orient("bottom");

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(ydataset)])
        .range([svgHeight, 0]);

    var x_axis = d3.axisBottom().scale(xScale).ticks(50);

    // var axis = d3.axisBottom(scale)(svg.append("g")
    //     .attr("transform", "translate(0,50)"));

    var y_axis = d3.axisLeft().scale(yScale);

    svg.append("g")
        .attr("transform", "translate(80, 0)")
        .call(y_axis);

    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", 20)
        .attr("x", -200)
        .attr("font-size", "16px")
        .text("Median household income")

    var xAxisTranslate = svgHeight - 10;


    svg.append("g")
        .attr("transform", "translate(40, " + xAxisTranslate + ")")
        .call(x_axis)
        .selectAll("text")
            .attr("class", "xaxis-class")
            .attr("x", function (d, i) {
                return (barWidth * i) + 20;
            })
            // .attr("x", 10)
            .attr("y", 25)
            // .attr("transform", "rotate(-65)")
            // .attr("transform", "rotate(-45)")
            .style("text-anchor", "end");


    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", svgHeight - 50)
        .attr("y", svgHeight + 50)
        .attr("font-size", "16px")
        .text("States");

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(ydataset)])
        .range([0, svgHeight]);
        
    var barChart = svg.selectAll("rect")
        .data(ydataset)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            return svgHeight - yscale(d);
        })
        .attr("height", function (d) {
            return yscale(d);
        })
        .attr("width", barWidth - barPadding)
        .attr("transform", function (d, i) {
            var translate = [82 + barWidth * i, -10];
            return "translate(" + translate + ")";
        })
        .attr("fill", "blue")
        .on("mouseover", function () { tooltip.style("display", null); })
        .on("mouseout", function () { tooltip.style("display", "none"); })
        .on("mousemove", function (d, i) {

            var xPosition = d3.mouse(this)[0] - 15 + 82 + barWidth * i;
            var yPosition = d3.mouse(this)[1] - 45;
            // console.log(xPosition);
            // console.log(yPosition);

            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text")
                .attr("data-html", "true")
                // .text("Median Income: " + d + "<br />" +  "State: " + xdataset[i])
                .html("<tspan x='0'>" + "Median Income: " + d + "</tspan>"
                    + "<tspan x='0' dy='1.2em'>" + "State: " + xdataset[i] + "</tspan>");
        })
        .on("click", function (d) {
            alert("drawing pie chart");
        });


    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 120)
        .attr("height", 40)
        .attr("fill", "gray")
        .style("opacity", 0.7);

    tooltip.append("text")
        .attr("x", 60)
        .attr("dy", "1.2em")
        .style("text-anchor", "center")
        .attr("fill", "white")
        .attr("font-size", "12px")
        .attr("font-weight", "bold");

    // adding labels

    // var text = svg.selectAll("text")
    //     .data(xdataset)
    //     .enter()
    //     .append("text")
    //     .text(function (d) {
    //         return d;
    //     })
    //     .attr("y", function (d, i) {
    //         return svgHeight - d - 2;
    //     })
    //     .attr("x", function (d, i) {
    //         return barWidth * i;
    //     })
    //     .attr("fill", "pink");

}

export default barchart;