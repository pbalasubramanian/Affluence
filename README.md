# Affluence

[Affluence Live](https://pbalasubramanian.github.io/Affluence/)

## Overview

Affluence is a visualization application that shows the median household income of all the states in the United States.
It also shows a visual representation of the different income brackets.

## Functionality

* This is a single-page app
* Users can select different years to see a change in the visual representation of the data.

## Technologies used

* Vanilla Javascript
* D3.js for data visualization
* HTML
* CSS

## Data

* Data was downloaded in .csv format from United States Census Bureau (census.gov).
* This data was then parsed and used for visualization.
* This application shows visualization of 2 data sets.

## Features

Users can select a year using the slider to view the household income data for all states in the United States. They can also view a comparison of the different income brackets for a particular year. There is a tooltip provided for every bar.

![alt text](https://github.com/pbalasubramanian/Affluence/blob/master/data/affluence.png "Affluence")

## Code

* Bar chart x-axis states rendering<br/>
To render the states along x-axis, use scaleLinear with a range of the width of the bar chart with domain 50 and then set the ticks and tickFormat to actually display the actual state name from the data set. In order to fit the state names, set the tranform attribute to rotate it by an angle.

```Javascript
    var x_axis = d3.axisBottom().scale(xScale)
        .ticks(50).tickFormat(function (d, i) { return xdataset[i]; });


    svg.append("g")
        .attr("transform", "translate(40, " + xAxisTranslate + ")")
        .call(x_axis)
        .selectAll("text")
        .attr("class", "xaxis-class")
        .attr("transform", function (d, i) {
            return "rotate(45)";
        })
        .attr("x", 5)
        .attr("y", 0)
        .style("text-anchor", "start");
```

* Pie chart - adding text within arcs<br/>
To add text within each arc, get the arc's center and then transform the text to be rendered relative to the center.

```Javascript
    const arc1 = arc.outerRadius(d => radiusScale(d.data.value));


    path.enter().append("text")
                .attr("transform", function (d) {
                    let [x,y] = arc1.centroid(d);
                    return "translate(" + [x-16,y] + ")";
                })
                .attr("text-anchor", "start")
                .text(function (d) { return d.data.value; });
```

## Future enhancements

* Capability to sort the states by median income
* Update user interaction


