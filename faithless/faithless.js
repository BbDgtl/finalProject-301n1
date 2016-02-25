
//parallax//////////////////////////////////////////////////////
var ypos,image;
function parallax(){
  ypos = window.pageYOffset;
  image = document.getElementById('image');
  image.style.top = ypos * 0.5 +'px';

}
window.addEventListener('scroll',parallax)
///////////////////////////////////////////////////////////////

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


//button///////////////////////////////////////////////////////

var myArray = [];

$("#submitButton").click(function(){
//
    // if ("#searchTxt").val()) {
    //   ("#events").empty();
    // }

    window.open("faithless/faithless.html");
    var searchResults = $("#myform").val();
    console.log(searchResults);

    $.ajax({
    type:"GET",
    url: "http://api.songkick.com/api/3.0/search/artists.json?query=" +"'"+searchResults+"'" +"&apikey=oleKZnXGwMwSb8es&jsoncallback=?",
    dataType:'jsonp',
    success: function(data){
        console.log(data);
        if (!data["resultsPage"]["results"]["artist"]){
            alert("I see the TYPO, dude!")
        }
        var secSearch = data["resultsPage"]["results"]["artist"][0].id;
        console.log(secSearch);

        $.ajax({
        type:"GET",
        url:  "http://api.songkick.com/api/3.0/artists/" + secSearch +"/calendar.json?apikey=oleKZnXGwMwSb8es&jsoncallback=?",
        dataType:'jsonp',
        success: function(secSearch){
            console.log(secSearch);
            if (!secSearch["resultsPage"]["results"]["event"]){
                alert("Sorry, no upcoming tour schedule.")
            }
            $.each(secSearch["resultsPage"]["results"]["event"], function(i,ele){
              $("#events").append('<li><a href="' + ele.uri+'">' + ele.displayName +'</a></li>');

            })
            console.log(secSearch);

            for(var i=0; i< secSearch.resultsPage.results.event.length; i++){
                  console.log(secSearch.resultsPage.results.event[i].location.lat + ", "+ secSearch.resultsPage.results.event[i].location.lng);
                  myArray.push(secSearch.resultsPage.results.event[i].location.lat + ", "+ secSearch.resultsPage.results.event[i].location.lng);
                }
                  console.log(myArray);

            for(var i=0; i<secSearch.resultsPage.results.event.length; i++){
                  console.log(secSearch.resultsPage.results.event[i].start.date);
                  console.log(secSearch.resultsPage.results.event[i].location.city);

            var marker =L.marker(myArray[i].split(','), {icon: starIcon}).addTo(map);
            marker.bindPopup("<b>Upcoming events!</b><br>" + "Date: "+ secSearch.resultsPage.results.event[i].start.date +"<br>"+ "Location @ " +secSearch.resultsPage.results.event[i].location.city).openPopup();
                }

        }
        })

    }
    })
});
