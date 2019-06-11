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

            // console.log(filteredData);
            // let orderedData = filteredData.sort(function (a, b) {
            //     return d3.ascending(a[1], b[1]);
            // });

            // console.log(orderedData);

            barchart(filteredData.map(item => [item.medianincome, item.state]),
                filteredData.map(item => item.medianincome),
                filteredData.map(item => item.state))

            piechart(yearSelect.value);

        }
    );

    const yearSelect = document.querySelector('input[type=range]');
    const yearDisplayArr = document.getElementsByClassName('yearDisplay');
    // debugger
    
    yearSelect.addEventListener("change", () => {
            document.querySelector('input[type=radio]').checked = "state";
            yearDisplayArr[0].innerHTML = yearSelect.value;
            const filteredData = allData.filter((item) => item.year === yearSelect.value).slice(1);
            barchart(filteredData.map(item => [item.medianincome, item.state]),
                    filteredData.map(item => item.medianincome),
                    filteredData.map(item => item.state))
            piechart(yearSelect.value);
        }
    );

    const sortRadio = document.querySelector('input[type=radio]');
    sortRadio.addEventListener("click", () => {
            if (sortRadio.value === "state" || sortRadio.checked === true) {
                yearDisplayArr[0].innerHTML = yearSelect.value;
                const filteredData = allData.filter((item) => item.year === yearSelect.value).slice(1);
                barchart(filteredData.map(item => [item.medianincome, item.state]),
                    filteredData.map(item => item.medianincome),
                    filteredData.map(item => item.state))
                piechart(yearSelect.value);
            }  
        }
    );

    const playButton = document.getElementById('play-button');
    let year = "1984";
    let interval = null;
    playButton.addEventListener("click", () => {
        document.querySelector('input[type=radio]').checked = "state";
        if (playButton.innerText === "Play") {
            playButton.innerText = "Pause";
            if( year < 2015 ) {
                interval = setInterval(step, 400);
            } else {
                clearInterval(interval);
            }
        } else {
            //alert("pausing");
            playButton.innerText = "Play";
            clearInterval(interval);
            interval = 0;
        }
    });

    function step() {
        document.querySelector('input').value = year;
        document.getElementsByClassName('yearDisplay')[0].innerHTML = year;
        yearSelect.value = year;
        const filteredData = allData.filter((item) => item.year === year).slice(1);
        barchart(filteredData.map(item => [item.medianincome, item.state]),
            filteredData.map(item => item.medianincome),
            filteredData.map(item => item.state))
        piechart(year);
        if( year < 2015 ) {
            let intyear = parseInt(year);
            intyear = intyear + 1;
            year = intyear + "";
        } else {
            playButton.innerText = "Play";
            clearInterval(interval);
            interval = 0;
            year = "1984";
        }
    }

})