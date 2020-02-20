anime({
  targets: ['#pie', '#pie1', '#pie2'],
  translateX: {
    value: 50,
    duration: 800
  },
  rotate: {
    value: 360,
    duration: 1800,
    delay: 1500,
    easing: 'easeInOutSine'
  },
  scale: {
    value: 1,
    duration: 1200,
    delay: 1000,
    easing: 'easeInOutQuart'
  },
  delay: 250 // All properties except 'scale' inherit 250ms delay
});
//to adjust the map height conflict with bootstrap
function stuffToRezie() {
  var h_window = $(window).height();
  var h_map = h_window - 125;
  $('#map').css('height', h_map);
}

$(window).on("resize", stuffToRezie).trigger('resize');

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
//Most frequent crime for each district
$.ajax({
  url: 'http://localhost:5000/api/v1.0/crime_data2',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },
  // data: data,
  type: 'GET',
  /* etc */
  success: function (crime_data2) {
    // console.log('Dataset 2');
    // console.log(crime_data2);
    let offense_cat = [];
    // crime_data2.forEach(crime => console.log(crime.Offense_Category));
    crime_data2.forEach(crime => offense_cat.push(`Top Crime District ${crime.Police_District}: ${crime.Offense_Category}`));
    // console.log('Labels');
    // console.log(offense_cat);

    let total_crimes = [];
    crime_data2.forEach(crime => total_crimes.push(crime.Total_Crimes));
    // console.log(`There are ${numGoodMovies} good movies.`);
    // console.log('Values');
    // console.log(total_crimes);


    // Display the default plot
    function init() {
      let data = [{
        values: total_crimes,
        labels: offense_cat,
        type: "pie",
        insidetextorientation: "radial",
        textinfo: "label+percent",
        // textposition: "outside",
        automargin: true
      }];

      let layout = {
        height: 600,
        width: 800,
        colorway: [
          "#011f4b",
          "#03396c",
          "#005b96",
          "#6497b1",
          "#a1b8c9",
          "#c9dce9"
        ],
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



    //end of data call
  }
})

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
        colorway: [
          "#0d7514",
          "#12a31c",
          "#17d224",
          "#30ec3d",
          "#5ef068",
          "#8cf493",
          "#baf8be"
        ],
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

$.ajax({
  url: 'http://localhost:5000/api/v1.0/crime_data4',
  headers: {
    'Access-Control-Allow-Origin': '*'
  },

  type: 'GET',
  /* etc */
  success: function (crime_data4) {
    console.log('Dataset 4');
    console.log(crime_data4);
    let beats = [];

    crime_data4.forEach(crime4 => beats.push(crime4.Beat));
    console.log('Labels');
    console.log(beats);

    let crimes_totalnamber = [];
    crime_data4.forEach(crime4 => crimes_totalnamber.push(crime4.Crimes_number));

    console.log(crimes_totalnamber);


    // Display the default plot
    function init_fordata4() {
      let data4 = [{
        values: crimes_totalnamber,
        labels: beats,
        type: "pie",
        textinfo: "label+percent",
        textposition: "outside",
        automargin: true
      }];

      let layout4 = {
        height: 600,
        width: 800,
        colorway: [
          "#000000",
          "#0c000c",
          "#190019",
          "#260026",
          "#330033",
          "#400040",
          "#4c004c",
          "#590059",
          "#660066",
          "#730073",
          "#800080",
          "#8c198c",
          "#993299",
          "#a64ca6",
          "#b266b2",
          "#bf7fbf",
          "#cc99cc",
          "#d8b2d8",
          "#e5cce5",
          "#f2e5f2"
        ],
        margin: {
          "t": 0,
          "b": 0,
          "l": 0,
          "r": 0
        }
      };

      Plotly.newPlot("pie2", data4, layout4);
    }
    init_fordata4();
  }
})


var map = L.map("map2", {
  center: [38.57, -121.46],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(map);


let link = "POLICE_BEATS.geojson"

function chooseColor(beat) {
  switch (beat) {
    case "1A":
      return "yellow";
    case "1B":
      return "yellow";
    case "1C":
      return "yellow";
    case "2A":
      return "orange";
    case "2B":
      return "orange";
    case "2C":
      return "orange";
    case "3A":
      return "purple";
    case "3B":
      return "red";
    case "3M":
      return "purple";
    case "4A":
      return "blue";
    case "4B":
      return "blue";
    case "4C":
      return "blue";
    case "5A":
      return "magenta";
    case "5B":
      return "magenta";
    case "5C":
      return "magenta";
    case "6A":
      return "cyan";
    case "6B":
      return "cyan";
    case "6C":
      return "cyan";
    case "6D":
      return "cyan";
    case "6E":
      return "green";
    default:
      return "black";
  }
}

function chooseDistrict(beat) {
  console.log(beat);
  // Use the key to determine which array to push the value to
  if ((beat === "1A") || (beat === "1B") || (beat === "1C")) {
    return "1";
  }
  if ((beat === "2A") || (beat === "2B") || (beat === "2C")) {
    return "2";
  }
  if ((beat === "3A") || (beat === "3B") || (beat === "3M")) {
    return "3";
  }
  if ((beat === "4A") || (beat === "4B") || (beat === "4C")) {
    return "4";
  }
  if ((beat === "5A") || (beat === "5B") || (beat === "5C")) {
    return "5";
  }
  if ((beat === "6A") || (beat === "6B") || (beat === "6C") || (beat === "6D") || (beat === "6E")) {
    return "6";
  } else {
    return "Not Found";
  }

}
//total_crimes function
function totalCrimes(beat) {
  console.log(beat);
  // Use the key to determine which array to push the value to
  switch (beat) {
    case "1A":
      return "187";
    case "1B":
      return "120";
    case "1C":
      return "84";
    case "2A":
      return "184";
    case "2B":
      return "142";
    case "2C":
      return "156";
    case "3A":
      return "174";
    case "3B":
      return "190";
    case "3M":
      return "145";
    case "4A":
      return "157";
    case "4B":
      return "107";
    case "4C":
      return "114";
    case "5A":
      return "106";
    case "5B":
      return "140";
    case "5C":
      return "150";
    case "6A":
      return "88";
    case "6B":
      return "123";
    case "6C":
      return "151";
    case "6D":
      return "102";
    case "6E":
      return "79";
    default:
      return "black";
  }

}
// Grabbing our GeoJSON data..
d3.json(link, function (data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {

    // Style each feature (in this case a neighborhood)
    style: function (feature) {
      console.log(feature);
      return {
        color: "white",
        // Call the chooseColor function to decide which color to color our neighborhood (color based on borough)
        fillColor: chooseColor(feature.properties['BEAT']),

        fillOpacity: 0.5,
        weight: 1.5
      };
    },
    // Called on each feature
    onEachFeature: function (feature, layer) {
      // Set mouse events to change map styling
      layer.on({
        // When a user's mouse touches a map feature, the mouseover event calls this function, that feature's opacity changes to 90% so that it stands out
        mouseover: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.9
          });
        },
        // When the cursor no longer hovers over a map feature - when the mouseout event occurs - the feature's opacity reverts back to 50%
        mouseout: function (event) {
          layer = event.target;
          layer.setStyle({
            fillOpacity: 0.5
          });
        },
        // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
        click: function (event) {
          map.fitBounds(event.target.getBounds());
        }
      });
      // Giving each feature a pop-up with information pertinent to it
      let Dist = chooseDistrict(feature.properties['BEAT']);

      let crime_num = totalCrimes(feature.properties['BEAT']);
      console.log(Dist);
      layer.bindPopup(

        "<h1>District: " + Dist + "</h1> <hr> <h2>Beat: " + feature.properties['BEAT'] +
        "</h2><hr><h2>Total Crimes: " + crime_num + "</h2>");

    }
  }).addTo(map);
});