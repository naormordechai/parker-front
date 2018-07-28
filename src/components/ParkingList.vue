<template>
  <section>
    <section>
    </section>
    <div class="container">
        
          <el-input placeholder="Search"></el-input>
      <ul>
          <li v-for="parking in parkings" :key="parking._id">
            <router-link class="text-decoration" :to="'parking/'+parking._id">
            <parkingPreview :parking="parking"/>
            </router-link>
          </li>
      </ul>
    </div>
       
  </section>
</template>

<script>
import ParkingPreview from './ParkingPreview.vue'

export default {
  data(){
    return{

    }
  },
   props:{
     parkings:Array
   },
   created(){
     
   },
   methods:{

     },
     mounted(){
        console.log('sababa',this.parkings);
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
