// import _ from 'lodash';
import barchart from './barchart';
import circle from './circle';
import * as d3 from 'd3';

// function component() {
//     const element = document.createElement('div');

//     // Lodash, currently included via a script, is required for this line to work
//     element.innerHTML = _.join(['Hello', 'webpack'], ' ');

//     return element;
// }

// document.body.appendChild(component());


// document.body.appendChild(barchart());
{/* <h3>Median household income data for states in the United States</h3> */}



// function readData() {
    
    let allData = [];

    document.addEventListener('DOMContentLoaded', () => {
       
        d3.csv("/data/median-household-income-by-state.csv")
            .then( data => {
                //debugger
                allData = data;

                const filteredData = allData.filter((item) => item.year === "2000");
                barchart(filteredData.map(item => item.medianincome),
                    filteredData.map(item => item.state))

            });

        const yearSelect = document.querySelector('input');
        const yearDisplayArr = document.getElementsByClassName('yearDisplay');
        // debugger
        yearSelect.addEventListener("change", () => {
                yearDisplayArr[0].innerHTML = yearSelect.value;
                const filteredData = allData.filter((item) => item.year === yearSelect.value);
            barchart(filteredData.map(item => item.medianincome),
                filteredData.map(item => item.state))
            }
        );


            // const [button1, button2] = document.querySelectorAll('button');

            // button1.addEventListener('click', () => {
            //     // debugger
            //     barchart( 
            //     allData.filter( (item) => item.year === "2014" )
            //         .map( item => item.medianincome ))
            //     }
            // );

            // button2.addEventListener('click', () => barchart(
            //     allData.filter((item) => item.year === "1999")
            //     .map(item => item.medianincome))
            // );
            // debugger
    });


    //var medianincomeArr = [];

    // d3.csv("/data/median-household-income-by-state.csv")
    //     .then(data => {
    //         //debugger
    //         if (data.year === "2013") {

    //         }
    //     });
    
    //     function (data) {
            
    //         // console.log(data);
    //         // console.log(data.year);
    //         if( data.year === "2013") {
    //             // console.log(data.state);
    //             // console.log(data.medianincome);
    //             medianincomeArr.push(parseInt(data.medianincome));

    //             if (medianincomeArr.length === 51) {
    //                 barchart(medianincomeArr);
    //             }
    //         }
    //         // for(let i=0; i<data.length; i++) {
    //             // console.log("in here");
    //             // console.log(data[i].year);
    //         // }
    //         //console.log(medianincomeArr);
            
    //     }
        
    // ).then();

    // barchart(medianincomeArr);
    // circle();
// }
// console.log(medianincomeArr);
// readData();
