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
    v-for="(p, index) in parkings"
    :position="p.location"
    :icon="getSymbol(p)"
    :clickable="true" 
    :draggable="false"
    @click="$router.push('/parking/' + p._id)"
  />
</GmapMap>  
    </div>
  </section>
</template>

<script>
import ParkingPreview from './ParkingPreview.vue'

export default {
   props:{
     parkings:Array
   },
   methods:{
       getSymbol(parking){
         return  (parking.occupiedUntil < Date.now()) 
                          ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png'
                          : 'http://www.geocodezip.com/mapIcons/greenSoldier.png'
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
