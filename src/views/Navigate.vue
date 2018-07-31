<template>
    <section>
        <div class="navigation-header">
            <h2>Congratulations, {{user.firstName}}!</h2>
            <p>Your parking at {{parking.address}} is waiting for you :)</p>
        </div>

       <!-- <div id="map" style="float:left;width:70%; height:100%"></div>
        <div id="directionsPanel" style="float:right;width:30%;height 100%"></div>  -->
        
        <GmapMap
            :center="parking.location"
            :zoom="11"
            map-type-id="terrain"
            style="height: 300px"
            ref="navigateMap"
        >
        </GmapMap>
        <div class="navigation flex space-between">              
            <!-- <el-button type="success" @click="navigate">Open Waze</el-button>                              -->
            <img src="../assets/images/waze.png" @click="navigate" />                             
            <el-button type="success" @click="toggleDirections">{{(!directions.show)? 'Show' : 'Hide'}} Directions</el-button>            
        </div>
        <div class="panel" v-show="directions.show" ref="panel"></div>        
    </section>
</template>

<script>
import ParkingService from "../../services/ParkingService.js";
import LocPosition from "../../services/LocService.js";
import LocService from "../../services/LocService.js";
import { gmapApi } from "vue2-google-maps";

export default {
  data() {
    return {
      userLocation: {
        location: {
          lat: 0,
          lng: 0
        }
      },
      parking: {
        location: {
          lat: 0,
          lng: 0
        }
      },
      directions: {
          distance: "",
          time: "",
          show: false,
          url: ''
        },      
      icon: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
    };
  },
  mounted: async function() {
    await Promise.all([this.loadParking(), this.getUserLocation()]);

    var google = await this.$gmapApiPromiseLazy()
      console.log(google);
    var directionsService = new this.google.maps.DirectionsService();
    var directionsDisplay = new this.google.maps.DirectionsRenderer();
    var userLocation = new google.maps.LatLng(
      this.userLocation.location.lat,
      this.userLocation.location.lng
    );

    var mapOptions = {
      zoom: 15,
      center: userLocation
    };
    var map = this.$refs.navigateMap.$mapObject;
    console.log('map ref: ', this.$refs.navigateMap)
    var panel = this.$refs.panel
    directionsDisplay.setMap(map);
    directionsDisplay.setPanel(panel);

    var request = {
      origin: this.userLocation.location,
      destination: this.parking.location,
      travelMode: "DRIVING"
    };
    directionsService.route(request, function(result, status) {
      if (status == "OK") {
        directionsDisplay.setDirections(result);
      }
    });
  },
  methods: {
    loadParking() {
      var parkingId = this.$route.params.id;
      //   console.log("this route URL: ", this.$route);
      return ParkingService.getById(parkingId).then(res => {
        this.parking = res.parking;
      });
    },
    getUserLocation() {
      return LocService.getPosition()
        .then(pos => {
          var location = {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude
          };
          this.userLocation.location = location;
        })
        .catch(err => {
          console.log("Something went wrong: ", err);
        });
    },
    initMap(userLocation) {
      console.log("this maps: ", this.google.maps);
      var directionsService = new this.google.maps.DirectionsService();
      var directionsDisplay = new this.google.maps.DirectionsRenderer();
      var mapOptions = {
        zoom: 15,
        center: userLocation
      };
      var map = new google.maps.Map(document.getElementById("map"), mapOptions);
      directionsDisplay.setMap(map);
    },

    navigate() {
        let lat= +this.parking.location.lat
        let lng= +this.parking.location.lng
        console.log('lat: ', lat)
        console.log('lng: ', lng)
        console.log('parking location: ', this.parking.location)
        window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
      
    },

    toggleDirections() {
        this.directions.show = !this.directions.show
    }
 },


    //   var userLoc = [
    //     this.userLocation.location.lat,
    //     this.userLocation.location.lng
    //   ];
    //   console.log("userLoc: ", userLoc);
    //   LocService.calcRoute(userLoc, this.parking.address);

      // var parkingAdd = this.parking.address
      // console.log('parking address: ', parkingAdd)

      // LocService.getDirections(userLoc, parkingAdd)
      // .then (res => {
      //     console.log('res: ', res)
      //     this.directions = res
      // })
    
    
 

  computed: {
    user() {
      return this.$store.getters.loggedInUser;
    },
    google: gmapApi    
  }
};
</script>

<style scoped>
.navigation {
  margin: 20px auto;
  width: 200px;
}

.navigation img {
    height: 50px;
}

navigation img:hover {
    cursor: pointer;
}

.navigation-header {
  margin: 20px;
}

.panel {
    width:40%;
    margin: 0 auto;
}
</style>
