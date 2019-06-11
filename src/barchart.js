import * as d3 from 'd3';

function barchart(dataset, ydataset, xdataset) {
    // console.log(ydataset);
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

    // console.log(xdataset);
    var xScale = d3.scaleLinear()
        .domain([0, 50])
        .range([47, svgWidth]);


    // var xScale = d3.scale.ordinal().
    //     rangeRoundBands([0, svgWidth]);
    // var x_axis = d3.svg.axis().scale(xScale).orient("bottom");

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(ydataset)])
        .range([svgHeight, 0]);

    var x_axis = d3.axisBottom().scale(xScale)
        .ticks(50).tickFormat(function (d, i) { return xdataset[i]; });

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
        .attr("transform", function (d, i) {
            // console.log(barWidth * i);
            // return "translate(" + ((i) + 0) + "), " + "rotate(-45)";
            return "rotate(45)";
        })
        .attr("x", 5)
        .attr("y", 0)
        .style("text-anchor", "start");

    // var xScale_states = d3.scaleOrdinal()
    //     .domain(xdataset)
    //     .range([0, 0]);

    // var x_axis_states = d3.axisBottom().scale(xScale_states);

    // svg.append("g")
    //     .attr("transform", "translate(40, " + xAxisTranslate + ")")
    //     .call(x_axis_states)
    //     .selectAll("text")
    //     .attr("class", "xaxis-class")
    //     // .attr("dy", ".35em")
    //     // .attr("transform", "translate(40, " + xAxisTranslate + ")" + "rotate(-65)")
    //     .attr("transform", function (d, i) {
    //         console.log(barWidth*i);
    //         return "translate(" + (((barWidth) * i) + 8) + "), " + "rotate(-45)";
    //         // return "rotate(-45)";
    //     })
    //     .attr("x", -22)
    //     .attr("y", 35)
    //     // .attr("dy", "1.2em")
    //     // .attr("transform", "rotate(-45)")
    //     .style("text-anchor", "start");


    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", svgHeight - 50)
        .attr("y", svgHeight + 70)
        .attr("font-size", "16px")
        .text("States");

    var yscale = d3.scaleLinear()
        .domain([0, d3.max(ydataset)])
        .range([0, svgHeight]);
        
    var barChart = svg.selectAll("rect")
        .data(dataset)
        .enter()
        .append("rect")
        .attr("y", function (d) {
            let a = d;
            // console.log(a);
            // console.log(yscale(a[0]));
            if (a && a !== undefined) return svgHeight - yscale(a[0]);
        })
        .attr("height", function (d) {
            let a = d;
            // console.log(a);
            if(a && a !== undefined) return yscale(a[0]);
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
            // var xPosition = d3.mouse(this)[0];
            // var yPosition = d3.mouse(this)[1];
            // console.log(xPosition);
            // console.log(yPosition);

            tooltip.attr("transform", "translate(" + xPosition + "," + yPosition + ")");
            tooltip.select("text")
                .attr("data-html", "true")
                // .text("Median Income: " + d + "<br />" +  "State: " + xdataset[i])
                .html("<tspan x='0'>" + "Median Income: " + d[0] + "</tspan>"
                    + "<tspan x='0' dy='1.2em'>" + "State: " + d[1] + "</tspan>");
        })
        .on("click", function (d) {
            // alert("drawing pie chart");
        });


    var tooltip = svg.append("g")
        .attr("class", "tooltip")
        .style("display", "none");

    tooltip.append("rect")
        .attr("width", 140)
        .attr("height", 40)
        .attr("fill", "darkgreen")
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

    //Sorting logic
    d3.select("#sortAscending")
        .on("click", function () {

            d3.select('.bar-chart').selectAll('text.tooltip').remove();

            let newdata = [];
            // let fiveData = [];
            barChart.sort(function (a, b) {
                return d3.ascending(a, b);
            })
                .transition()
                .delay(function (d, i) {
                    return i * 50;  // gives it a smoother effect
                })
                .duration(1000)
                .attr("transform", function (d, i) {
                    // console.log(d);
                    if( d !== undefined )newdata.push(d[1]);
                    // console.log(dataset[i]);
                    let xVal = xScale(i) + 35;
                    // console.log("xVal==" + xVal);
                    return "translate(" + xVal + ",-10)";
                });
                
            d3.select('.bar-chart').selectAll('text.xaxis-class').remove();
            

            x_axis = d3.axisBottom().scale(xScale)
                .ticks(50).tickFormat(function (d, i) { 
                    return newdata[i];
                    // let a = dataset[i];
                    // console.log(dataset[i]);
                    // if( a !== undefined ) return a[1]; 
                });

            svg.append("g")
                .transition()
                .delay(function (d, i) {
                    return i * 50;  // gives it a smoother effect
                })
                .duration(1000)
                .attr("transform", "translate(40, " + xAxisTranslate + ")")
                .call(x_axis)
                .selectAll("text")
                .attr("class", "xaxis-class")
                .attr("transform", function (d, i) {
                    // console.log(barWidth * i);
                    // return "translate(" + ((i) + 0) + "), " + "rotate(-45)";
                    return "rotate(45)";
                })
                .attr("x", 5)
                .attr("y", 0)
                .style("text-anchor", "start");

        });

    d3.select("#sortDescending")
        .on("click", function () {

            d3.select('.bar-chart').selectAll('text.tooltip').remove();

            let newdata = [];
            barChart.sort(function (a, b) {
                // console.log(a);
                // console.log(b);
                return d3.descending(a, b);
            })
                .transition()
                .delay(function (d, i) {
                    return i * 50;  // gives it a smoother effect
                })
                .duration(1000)
                .attr("transform", function (d, i) {
                    // console.log(d);
                    if (d !== undefined) newdata.push(d[1]);
                    // console.log(dataset[i]);
                    let xVal = xScale(i) + 35;
                    // console.log("xVal==" + xVal);
                    return "translate(" + xVal + ",-10)";
                });

            d3.select('.bar-chart').selectAll('text.xaxis-class').remove();


            x_axis = d3.axisBottom().scale(xScale)
                .ticks(50).tickFormat(function (d, i) {
                    return newdata[i];
                    // let a = dataset[i];
                    // console.log(dataset[i]);
                    // if( a !== undefined ) return a[1]; 
                });

            svg.append("g")
                .transition()
                .delay(function (d, i) {
                    return i * 50;  // gives it a smoother effect
                })
                .duration(1000)
                .attr("transform", "translate(40, " + xAxisTranslate + ")")
                .call(x_axis)
                .selectAll("text")
                .attr("class", "xaxis-class")
                .attr("transform", function (d, i) {
                    // console.log(barWidth * i);
                    // return "translate(" + ((i) + 0) + "), " + "rotate(-45)";
                    return "rotate(45)";
                })
                .attr("x", 5)
                .attr("y", 0)
                .style("text-anchor", "start");

        });
}

export default barchart;