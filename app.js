var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


$.ajax({
  url: 'http://localhost:5000/api/v1.0/crime_data',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  // data: data,
  type: 'GET',
  /* etc */
  success: function (jsondata) {
    // console.log('Dataset 1');
    // console.log(jsondata);
  }
})
//chart_2 Most frequent crime for each district
$.ajax({
  url: 'http://localhost:5000/api/v1.0/crime_data2',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  // data: data,
  type: 'GET',
  /* etc */
  success: function (crime_data2) {
    console.log('Dataset 2');
    console.log(crime_data2);
    let offense_cat = [];

    crime_data2.forEach(crime => offense_cat.push(`Top Crime District ${crime.Police_District}: ${crime.Offense_Category}`));
    console.log('Labels');
    console.log(offense_cat);

    let total_crimes = [];
    crime_data2.forEach(crime => total_crimes.push(crime.Total_Crimes));

    console.log('Values');
    console.log(total_crimes);


    // Display the default plot
    function init() {
      let data = [{
        values: total_crimes,
        labels: offense_cat,
        type: "pie",
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }];

      let layout = {
        height: 600,
        width: 800,
        margin: {
          "t": 0,
          "b": 0,
          "l": 0,
          "r": 0
        }
      };

      Plotly.newPlot("pie", data, layout);
    }
    init();
  }
})


//chart-3 Volume of crimes vs days

$.ajax({
  url: 'http://localhost:5000/api/v1.0/crime_data3',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },

  type: 'GET',
  /* etc */
  success: function (crime_data3) {
    console.log('Dataset 3');
    console.log(crime_data3);
    let days = [];

    crime_data3.forEach(crime3 => days.push(crime3.Day_of_week));
    console.log('Labels');
    console.log(days);

    let crimes_totalnamber = [];
    crime_data3.forEach(crime => crimes_totalnamber.push(crime.Crimes_number));

    console.log(crimes_totalnamber);


    // Display the default plot
    function init_fordata3() {
      let data3 = [{
        values: crimes_totalnamber,
        labels: days,
        type: "pie",
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }];

      let layout3 = {
        height: 600,
        width: 800,
        margin: {
          "t": 0,
          "b": 0,
          "l": 0,
          "r": 0
        }
      };

      Plotly.newPlot("pie1", data3, layout3);
    }
    init_fordata3();
  }
})

// 4th visualization
// $.ajax({
//   url: 'http://localhost:5000/api/v1.0/crime_data4',
//   headers: {
//     'Access-Control-Allow-Origin': '*'
//   },

//   type: 'GET',
//   /* etc */
//   success: function (crime_data4) {
//     console.log('Dataset 4');
//     console.log(crime_data4);
//     let days = [];

//     crime_data4.forEach(crime4 => days.push(crime4.Day_of_week));
//     console.log('Labels');
//     console.log(days);

//     let crimes_totalnamber = [];
//     crime_data4.forEach(crime4 => crimes_totalnamber.push(crime4.Crimes_number));

//     console.log(crimes_totalnamber);


//     // Display the default plot
//     function init_fordata4() {
//       let data4 = [{
//         values: crimes_totalnamber,
//         labels: days,
//         type: "pie",
//         textinfo: "label+percent",
//         textposition: "outside",
//         automargin: true
//       }];

//       let layout4 = {
//         height: 600,
//         width: 800,
//         margin: {
//           "t": 0,
//           "b": 0,
//           "l": 0,
//           "r": 0
//         }
//       };

//       Plotly.newPlot("pie", data4, layout4);
//     }
//     init_fordata4();
//   }
// })