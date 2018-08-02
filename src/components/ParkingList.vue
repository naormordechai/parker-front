<template>
  <section v-if="pos !== null">
    <!-- <ParkingFilter /> -->
    <ParkingFilter />
    <div class="container flex ">      
      <div class="list-h">
    <FilterBy />
      <ul>
          <li v-for="parking in parkings" :key="parking._id">
            <parkingPreview :parking="parking"/>
          </li>
      </ul>
      </div>
      <GmapMap v-if="pos"
  :center="pos"
  :zoom="14"
  map-type-id="terrain"
  style="width: 60%; height: 100vh; flex:1"
>
  <GmapMarker
    :key="index"
    v-for="(p, index) in parkings"
    :position="p.location"
    :icon="getSymbol(p)"
    :clickable="true" 
    :draggable="false"
    @click="$router.push('/parking/' + p._id)"
  />

  <GmapMarker 
    :position="pos"
    :icon="iconBase"
  />

</GmapMap>  
    </div>
  </section>
</template>

<script>

import ParkingPreview from './ParkingPreview.vue';
import LocService from '../../services/LocService.js'
import ParkingFilter from './ParkingFilter.vue' 
import FilterBy from './FilterByCmp.vue'
import { eventBus } from '../../services/EventBusService';

export default {
  data(){
    return {
      pos:null,
      iconBase : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    }
  },
   props:{
     parkings:Array
   },
   methods:{
       getSymbol(parking){
         return  (parking.occupiedUntil < Date.now()) 
                          ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                          : ''
       }, 
       getMyPos(){
        return LocService.getPosition()
       .then(pos => {
            let lat = pos.coords.latitude;
            let lng = pos.coords.longitude;
            return {lat : lat,lng : lng}
         })
       },
      getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          // return console.log('ddddd!!!',d + 'kilometers');
          return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    },

    getDistanceByKilometer(){
      var distances = this.parkings.map(parking => {
        parking.location.distance = this.getDistanceFromLatLonInKm(this.pos.lat,this.pos.lng,parking.location.lat,parking.location.lng)
        return parking
    })
      // console.log('triend',distances);
      
    distances.sort((a,b) => {
      return a.location.distance - b.location.distance
    })
    return distances

  },
},
  created(){
        this.getMyPos()
         .then(res => {
          this.pos = res
          this.getDistanceByKilometer()
        //  console.log('getArratForParkings',this.getDistanceByKilometer())
         });
     },
     computed:{
       sortParkings(){
         return this.getDistanceByKilometer()
       }
     },
  components:{
    ParkingPreview,
    ParkingFilter,
    FilterBy
    },
}
</script>

<style scoped>
ul {
  list-style: none;
}
.text-decoration {
  text-decoration: none;
}

.list-h {
  height: 100vh;
  overflow-y: scroll;
}


</style>
