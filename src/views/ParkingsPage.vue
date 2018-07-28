<template>
<section>
    <ParkingList :parkings = "parkings"/>
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
    computed:{
        parkings(){
            return this.$store.getters.parkingToDisplay
        }
    },
    created(){
        this.$store.dispatch({type: 'loadParkings'})
    },
        components:{
        ParkingList
    },
}
</script>

<style>
</style>
