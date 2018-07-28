<template>
<section>
    <ParkingList :parkings ="parkings"/>
    </section>
</template>

<script>
import ParkingList from '@/components/ParkingList.vue' 
import ParkingService from '../../services/ParkingService.js'


export default {
    data(){
        return{

        }
    },
    created(){
       this.$store.dispatch({type:'loadParkings'})
    },
    computed:{
        parkings() {
            return this.$store.getters.parkingsToDisplay;
        }
    },
        components:{
            ParkingList
    },
}
</script>

<style>
</style>
