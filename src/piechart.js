import * as d3 from 'd3';

function piechart(selectedYear, inputdata) {

    let width = 370;
    const height = 300;

    if (inputdata !== undefined) {
        width = 300;
    }

    d3.select('.pie-chart-area').selectAll('path').remove();
    d3.select('.pie-chart-area').selectAll('text').remove();
    d3.select('.pie-chart-area').selectAll('.averageLine').remove();

    const svg = d3.select(".pie-chart-area")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2}, ${height / 2})`);

    // const color = d3.scaleOrdinal(["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f"]);
    // const color = d3.scaleOrdinal(["#da0a37", "#eb5317", "#2c5bc9", "#d44da1", "#5d8f0c", "#ffd92f"]);
    const color = d3.scaleOrdinal(["#9A031E", "#CB793A", "#FCDC4D", "#05668D", "#139A43"]);

    const pie = d3.pie()
        .value(1)
        .sort(null);

    const arc = d3.arc()
        .innerRadius(0);

    function prepareData(d) {
        return {
            name: d.year,
            average: parseInt(d.average),
            values: [
                {
                    name: "first",
                    value: parseInt(d["1"])
                },
                {
                    name: "second",
                    value: parseInt(d["2"])
                },
                {
                    name: "third",
                    value: parseInt(d["3"])
                },
                {
                    name: "fourth",
                    value: parseInt(d["4"])
                },
                {
                    name: "fifth",
                    value: parseInt(d["5"])
                }
            ]
        }
    }

    function arcTween(a) {
        const i = d3.interpolate(this._current, a);
        this._current = i(1);
        return t => arc(i(t));
    }

    d3.csv("data/household-income-brackets.csv", prepareData).then(data => {
        data = data.reverse();

        // console.log(data);
        const radiusScale = d3.scaleSqrt()
            .domain([0, data[49].values[4].value])
            .range([0, Math.min(width, height) / 2]);

        function update(data) {
            updateHTML(data);

            const arc1 = arc.outerRadius(d => radiusScale(d.data.value));

            const path = svg.selectAll("path")
                .data(pie(data.values));

            path.transition().duration(200).attrTween("d", arcTween);

            path.enter().append("path")
                .attr("fill", (d, i) => color(i))
                .attr("d", arc)
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .each(function (d) { this._current = d; });

            path.enter().append("text")
                .attr("transform", function (d) {
                    let [x,y] = arc1.centroid(d);
                    return "translate(" + [x-10,y] + ")";
                })
                .attr("text-anchor", "start")
                .attr("font-size", "11px")
                .text(function (d) { return d.data.value; });

            svg.select(".averageLine").transition().duration(200)
                .attr("r", radiusScale(data.average));

            
        }

        if(inputdata !== undefined) {
            // console.log(inputdata);
            update(inputdata);
            return;
        }
        const filteredData = data.filter((item) => item.name === selectedYear);
        // console.log(filteredData);
        // console.log(data[0]);
        update(filteredData[0]);

        // data[0].values.forEach((d, i) => {
        //     svg.append("circle")
        //         .attr("fill", "none")
        //         .attr("cx", 0)
        //         .attr("cy", 0)
        //         .attr("r", radiusScale(d.value))
        //         .attr("stroke", color(i))
        //         .attr("stroke-dasharray", "4,4");
        // });

        // svg.append("circle")
        //     .attr("class", "averageLine")
        //     .attr("fill", "none")
        //     .attr("cx", 0)
        //     .attr("cy", 0)
        //     .attr("stroke", "grey")
        //     .attr("stroke-width", "2px");

    });

    function updateHTML(data) {
        // // Update table values
        document.getElementById("fig1").innerText = data.values[0].value.toLocaleString();
        document.getElementById("fig2").innerText = data.values[1].value.toLocaleString();
        document.getElementById("fig3").innerText = data.values[2].value.toLocaleString();
        document.getElementById("fig4").innerText = data.values[3].value.toLocaleString();
        document.getElementById("fig5").innerText = data.values[4].value.toLocaleString();
        document.getElementById("avFig").innerText = data.average.toLocaleString();
        
        if(inputdata !== undefined) {
            document.getElementById("hd1").innerText = "State";
            document.getElementById("val1").innerText = data.values[0].name.toLocaleString();
            document.getElementById("val2").innerText = data.values[1].name.toLocaleString();
            document.getElementById("val3").innerText = data.values[2].name.toLocaleString();
            document.getElementById("val4").innerText = data.values[3].name.toLocaleString();
            document.getElementById("val5").innerText = data.values[4].name.toLocaleString();
        } else {
            document.getElementById("hd1").innerText = "Income Bracket";
            document.getElementById("val1").innerText = "Lowest 20%";
            document.getElementById("val2").innerText = "Second-Lowest 20%";
            document.getElementById("val3").innerText = "Middle 20%";
            document.getElementById("val4").innerText = "Second-Highest 20%";
            document.getElementById("val5").innerText = "Highest 20%";
        }
    }
}

export default piechart;