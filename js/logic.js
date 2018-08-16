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
    center: [0.00, 0.00],
    zoom: 11
});

console.log("made it 1")
// We use the addTo method to add objects to our map
lightmap.addTo(map);



// Make a Function that will pull out the data we need out of a geojson file:

var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

d3.json(link).then(successHandle, errorHandle);

// Error function

function errorHandle(error) {
    console.log(error)
};

function successHandle(data) {
    
}

// look at pointToLayer for a marker....it will be easier


// d3.json(url).then(data => {
//     L.geoJSON(data, {
//         onEachFeature((feature, layer)=>{
//             feature = L.CirlcleMarker
//         })
// })})