<template>
  <section>
    <div class="container flex ">
      <div class="list-h">
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

export default {
  data(){
    return {
      pos:null,
      iconBase : 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
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
     },

     created(){
        this.getMyPos()
         .then(res => {
          this.pos = res
          console.log('this.pos',this.pos);
         })
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

.list-h {
  height: 100vh;
  overflow-y: scroll;
}
</style>
