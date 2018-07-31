const GOOGLE_API_KEY = 'AIzaSyC6AifY9XewU3b2wEp0Dr7XKyOjSS1oebQ'
import axios from 'axios';
 

function getPosition() {
    console.log('Getting Pos');

    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

function getDirections(origin, destination) {
    console.log('origin: ', origin)
    console.log('destination: ', destination)
    return axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${GOOGLE_API_KEY}`)
    .then ((res) => {
        console.log('results: ', res)
        return res.data
    })
}

function initMap(userLocation) {
    var directionsService = new google.maps.DirectionsService();
    var directionsDisplay = new google.maps.DirectionsRenderer();
    // var userLoc = new google.maps.LatLng(41.850033, -87.6500523);
    var mapOptions = {
      zoom: 15,
      center: userLocation
    }
    var map = new google.maps.Map(document.getElementById('map'), mapOptions);
    directionsDisplay.setMap(map);
  }

function calcRoute(userLocation, parkingLocation) {  
        var start = userLocation
        var end = parkingLocation
        var request = {
          origin:start,
          destination:end,
          travelMode: 'DRIVING'
        };
        // directionsService.route(request, function(response, status) {
        //   if (status == 'OK') {
        //     directionsDisplay.setDirections(response);
        //   }
        // });
}




export default {
    getPosition,
    getDirections,
    calcRoute,
    initMap
}