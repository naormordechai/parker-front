<template>
  <section>
    <div class="container flex">
      <ul>
          <li v-for="parking in parkings" :key="parking._id">
            <parkingPreview :parking="parking"/>
          </li>
      </ul>
      <GmapMap
  :center="{lat:32.093063, lng:34.778312}"
  :zoom="11"
  map-type-id="terrain"
  style="width: 60%; height: 100vh"
>
  <GmapMarker
    :key="index"
    v-for="(m, index) in markers"
    :position="m.position"
    :icon="available"
    :clickable="true" 
    :draggable="false"
    @click="openDetailsByMarker($event)"
  />
</GmapMap>
    </div>
  </section>
</template>

<script>
import ParkingPreview from './ParkingPreview.vue'

export default {
  data(){
    return{
      available:'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
    }
  },
   props:{
     parkings:Array
   },
   methods:{
     openDetailsByMarker(ev){
       let position = {lat : ev.latLng.lat(), lng:+ev.latLng.lng().toFixed(3)}
        this.parkings.forEach(parking => {
            if (parking.location.lat === position.lat && parking.location.lng === position.lng){
              var parkingId = parking._id
              this.$router.push('/parking/'+parkingId)

            }
        });
     }
     },
     created(){
     },
     computed:{
        markers(){
          var markersArr = []
        this.parkings.forEach(parking => {
          markersArr.push({
            position : {lat:parking.location.lat,lng:parking.location.lng}
          })
        });
        return markersArr
        },
        available(){
          this.parking.forEach(parking => {
            if(parking.occupiedUntil < Date.now()){
              return 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
            } else {
              return 'http://www.geocodezip.com/mapIcons/greenSoldier.png'
            }
          })
        }
     },
  components:{
    ParkingPreview
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
</style>
