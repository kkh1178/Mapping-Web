// First, 

// Create the tile layer that will be the background of our map

var lightmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    // wattribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 10,
    id: "mapbox.emerald",
    accessToken: API_KEY
});

console.log("made it 0")


// Creating our initial map object
var map = L.map("map-id", {
    center: [-6.121435, 106.774124],
    zoom: 13
});

console.log("made it 1")
// We use the addTo method to add objects to our map
lightmap.addTo(map);



// Make a Function that will pull out the data we need out of a geojson file:

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

function markerSize(marker) {
    return marker * 20000;
}

function colors(d) {
    // let color = 'purple';
    // if (data >= 4) {
    //     color = "red";
    // }

    // return color;
    // return data >= 4 ? "red" : "green";

    return d > 7 ? '#800026' :
        d > 6 ? '#BD0026' :
        d > 5 ? '#E31A1C' :
        d > 4 ? '#FC4E2A' :
        d > 3 ? '#FD8D3C' :
        d > 2 ? '#FEB24C' :
        d > 1 ? '#FED976' :'#FFEDA0';
};


// Perform a GET request to the query URL
d3.json(link, data => {
    // Pull the data out of the geojson object
    var earthquake = data.features
    console.log(earthquake)
    for (var i = 0; i < earthquake.length; i++) {
        // var geo = earthquake[i].geometry["coordinates"]
        var lat = earthquake[i].geometry["coordinates"][1]
        var long = earthquake[i].geometry["coordinates"][0]
        var id = earthquake[i].id
        var mag = earthquake[i].properties["mag"]
        var location = earthquake[i].properties["place"]
        // console.log(earthquake[i].geometry["coordinates"])

        // make the circles
        L.circle([lat, long], {
            fillOpacity: 0.75,
            color: colors(mag),
            fillColor: colors(mag),
            // Setting our circle's radius equal to the output of our markerSize function
            radius: markerSize(mag)
        }).bindPopup("<h1>" + id + "</h1> <hr> <h3>Magnitude: " + mag + "</h3>" + "<hr> <h3>location: " + location + "</h3>").addTo(map);
        // console.log(mag)
        // console.log(long)
    }

});

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitudes = [0, 1, 2, 3, 4, 5, 6, 7],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors(magnitudes[i] + 1) + '"></i> ' +
            magnitudes[i] + (magnitudes[i + 1] ? '&ndash;' + magnitudes[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);

// // Loop through the cities array and create one marker for each city object
// for (var i = 0; i < cities.length; i++) {
//     L.circle(cities[i].location, {
//       fillOpacity: 0.75,
//       color: "white",
//       fillColor: "purple",
//       // Setting our circle's radius equal to the output of our markerSize function
//       // This will make our marker's size proportionate to its population
//       radius: markerSize(cities[i].population)
//     }).bindPopup("<h1>" + cities[i].name + "</h1> <hr> <h3>Population: " + cities[i].population + "</h3>").addTo(myMap);
//   }
//     // Once we get a response, send the data.features object to the createFeatures function
//     createFeatures(data.features);
// });

// // Define a function we want to run once for each feature in the features array
// // Give each feature a popup describing the place and time of the earthquake
// function onEachFeature(feature, layer) {
//     layer.bindPopup("<h3>" + feature.properties.place +
//         "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
// }
// // Create a GeoJSON layer containing the features array on the earthquakeData object
// // Run the onEachFeature function once for each piece of data in the array
// var earthquakes = L.geoJSON(earthquakeData, {
//     onEachFeature: onEachFeature
// });

// // Sending our earthquakes layer to the createMap function
// createMap(earthquakes);


// function createMap(earthquakes) {

//     // Define streetmap and darkmap layers
//     var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "mapbox.streets",
//         accessToken: API_KEY
//     });

//     var darkmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "mapbox.dark",
//         accessToken: API_KEY
//     });

//     // Define a baseMaps object to hold our base layers
//     var baseMaps = {
//         "Street Map": streetmap,
//         "Dark Map": darkmap
//     };

//     // Create overlay object to hold our overlay layer
//     var overlayMaps = {
//         Earthquakes: earthquakes
//     };

//     // Create our map, giving it the streetmap and earthquakes layers to display on load
//     var myMap = L.map("map", {
//         center: [
//             37.09, -95.71
//         ],
//         zoom: 5,
//         layers: [streetmap, earthquakes]
//     });

//     // Create a layer control
//     // Pass in our baseMaps and overlayMaps
//     // Add the layer control to the map
//     L.control.layers(baseMaps, overlayMaps, {
//         collapsed: false
//     }).addTo(myMap);
// }

// look at pointToLayer for a marker....it will be easier


// d3.json(url).then(data => {
//     L.geoJSON(data, {
//         onEachFeature((feature, layer)=>{
//             feature = L.CirlcleMarker
//         })
// })})