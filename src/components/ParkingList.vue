<template>
  <section>
      <ul>
          <li v-for="parking in parkings" :key="parking._id">
            <router-link class="text-decoration" :to="'parking/'+parking._id">
            <parkingPreview :parking="parking"/>
            </router-link>
          </li>
      </ul>
  </section>
</template>

<script>
import ParkingPreview from './ParkingPreview.vue'

export default {
    props: {
        parkings: Array,

    },
    // props: [parkings]

components:{
        ParkingPreview
    },
}
</script>

<style scoped>
ul{
    list-style: none;
}
.text-decoration{
    text-decoration: none;
}
</style>
