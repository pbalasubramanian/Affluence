import * as d3 from 'd3';

function barchart(ydataset, xdataset) {
    //console.log(ydataset);

    // console.log(xdataset);

    d3.select('.bar-chart').selectAll('rect').remove();
    d3.select('.bar-chart').selectAll('g').remove();

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

    var x_axis = d3.axisBottom().scale(xScale);

    // var axis = d3.axisBottom(scale)(svg.append("g")
    //     .attr("transform", "translate(0,50)"));

    var y_axis = d3.axisLeft().scale(yScale);

    svg.append("g")
        .attr("transform", "translate(50, 0)")
        .call(y_axis);

    var xAxisTranslate = svgHeight - 10;


    svg.append("g")
        .attr("transform", "translate(20, " + xAxisTranslate + ")")
        // .attr("transform", "rotate(-65)")
        .call(x_axis)
        .selectAll("text")
            // .style("text-anchor", "end")
            .attr("x", function (d, i) {
                return (barWidth * i) + 40;
            })
            .attr("y", 25)
        .style("text-anchor", "start");
            // .attr("transform", "rotate(-65)");
            // .attr("transform", "rotate(-45)")
        // .style("text-anchor", "end");

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
            var translate = [50 + barWidth * i, -10];
            return "translate(" + translate + ")";
        })
        .attr("fill", "blue");


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