
$.getJSON("", function(data){
  var edmSeattle = [];
  $.each(data, function(key, val){
      edmSeattle.push("/geocoordinates/");

  });
  console.log(edmShow);
});

//on the map page link this js along with leaflet'
// <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.css" />
// <script src="http://cdn.leafletjs.com/leaflet/v0.7.7/leaflet.js"></script>
// <div id='map'><div>
// #map{ height: 180px;}

var flameIcon = L.icon({
  iconUrl: 'flame.png',
  iconSize: [18,18]
})

var map = L.map("map").setView("47.61,-122.48", 15);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'lucienspiff.p3a06028',
    // accessToken: 'pk.eyJ1IjoibHVjaWVuc3BpZmYiLCJhIjoiY2lrc3piYmZnMDAxa3V5bTNyamoyZWlmYyJ9.yhVnDmBZYIg5NjUIMUnvEg'
    accessToken:'pk.eyJ1IjoibHVjaWVuc3BpZmYiLCJhIjoiY2lrYW02cTkwMGx5c3V4a3Uya2MxNzhycCJ9.qRZLpeV6S5pMKjpEFz7IAA'

}).addTo(map);

var marker = L.marker([47.61,-122.48]), {icon: flameIcon})addTo(map);
