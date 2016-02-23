//parallax//////////////////////////////////////////////////////
var ypos,image;
function parallex(){
  ypos = window.pageYOffset;
  image = document.getElementById('image');
  image.style.top = ypos * 0.5 +'px';

}
window.addEventListener('scroll',parallex)
///////////////////////////////////////////////////////////////

var myArray =[];

$(document).ready(function(){
  $.ajax({
    url:  "http://api.songkick.com/api/3.0/artists/480448/calendar.json?apikey=oleKZnXGwMwSb8es&jsoncallback=?",
    dataType:"jsonp",
    success: function(data){
      $.each(data["resultsPage"]["results"]["event"], function(i, entry){
        $("#events").append('<li><a href="' + entry.uri+'">'+entry.displayName +'</a></li>');

    })
    console.log(data);

    for(var i=0; i< data.resultsPage.results.event.length; i++){
      console.log(data.resultsPage.results.event[i].location.lat + ", "+ data.resultsPage.results.event[i].location.lng);
      myArray.push(data.resultsPage.results.event[i].location.lat + ", "+ data.resultsPage.results.event[i].location.lng);

    }

    console.log(myArray);
    console.log(myArray[0]);

    // var showDate = data.resultsPage.results.event.start.date[i]

    for(var i=0; i<data.resultsPage.results.event.length; i++){
        console.log(data.resultsPage.results.event[i].start.date);
        console.log(data.resultsPage.results.event[i].location.city);

        var marker =L.marker(myArray[i].split(','), {icon: starIcon}).addTo(map);
        marker.bindPopup("<b>Upcoming events!</b><br>" + "Date: "+ data.resultsPage.results.event[i].start.date +"<br>"+ "Location @ " +data.resultsPage.results.event[i].location.city).openPopup();

    }
    // for(var i=0; i<data.resultsPage.results.event.length, i<data.resultsPage.results.event.start.date[i]; i++){
    //     var marker =L.marker(myArray[i].split(','), {icon: starIcon}).addTo(map);
    //     var showDate = data.resultsPage.results.event.start.date[i];
    //
    //     marker.bindPopup("<b>Upcoming events!</b><br>" + "Date: " + showDate +"@ <br>").openPopup();
    //
    // }


    }
  })

});

///////////////////////////////////////////////////////////////////

var starIcon = L.icon({
  iconUrl: 'star.jpg',
  iconSize: [20,20]

});

var map = L.map('map').setView([47.65, -122.31], 5);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'lucienspiff.p3a06028',
      accessToken: 'pk.eyJ1IjoibHVjaWVuc3BpZmYiLCJhIjoiY2lrYW02cTkwMGx5c3V4a3Uya2MxNzhycCJ9.qRZLpeV6S5pMKjpEFz7IAA'
    }).addTo(map);


//Hard coded for current location;
var marker = L.marker([47.65, -122.31], {icon: starIcon}).addTo(map);
marker.bindPopup("<b>Hello, Seattle</b><br>I am Here! :)").openPopup();



// var marker = L.marker(myArray[i], {icon: starIcon}).addTo(map);

// function onMapClick(e){
//   alert("You clicked at "+ e.latlng);
//
// }
// map.on("click", onMapClick);

var popup = L.popup();

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You've clicked at " + e.latlng.toString())
    .openOn(map);

  }
map.on('click', onMapClick);
