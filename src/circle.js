import * as d3 from 'd3';

function circle() {
    var svgWidth = 600, svgHeight = 500;
    var svg = d3.select(".circle")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var circle = svg.append("circle")
        .attr("cx", 200)
        .attr("cy", 300)
        .attr("r", 80)
        .attr("fill", "#7CE8D5"); 
}

export default circle;