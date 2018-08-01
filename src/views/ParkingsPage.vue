<template>
<section>
    <!-- <ParkingFilter /> -->

    <ParkingList :parkings ="parkings"/>
    </section>
</template>

<script>
import ParkingList from '@/components/ParkingList.vue' 
import LocService from '../../services/LocService'
// import ParkingFilter from '@/components/ParkingFilter.vue'


export default {
    data(){
        return{
            filter :'',

        }
    },
    created (){
       this.$store.dispatch({type:'loadParkings'});
    },
    computed:{
        parkings() {
            return this.$store.getters.parkingToDisplay
        }
    },
        components:{
            ParkingList,
            // ParkingFilter
    },
}
</script>

<style>
</style>
