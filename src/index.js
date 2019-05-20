import barchart from './barchart';
import piechart from './piechart';

import * as d3 from 'd3';

let allData = [];

document.addEventListener('DOMContentLoaded', () => {
    
    d3.csv("data/median-household-income-by-state.csv")
        .then( data => {
            //debugger
            allData = data;

            const filteredData = allData.filter((item) => item.year === "2000").slice(1);
            barchart(filteredData.map(item => item.medianincome),
                filteredData.map(item => item.state))

            piechart(yearSelect.value);

        }
    );

    const yearSelect = document.querySelector('input');
    const yearDisplayArr = document.getElementsByClassName('yearDisplay');
    // debugger
    
    yearSelect.addEventListener("change", () => {
            yearDisplayArr[0].innerHTML = yearSelect.value;
            const filteredData = allData.filter((item) => item.year === yearSelect.value).slice(1);
            barchart(filteredData.map(item => item.medianincome),
                filteredData.map(item => item.state))
            piechart(yearSelect.value);
        }
    );
    
    
})