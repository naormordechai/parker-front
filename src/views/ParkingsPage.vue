<template>
<section>
    <ParkingList :parkings ="parkings"/>
    </section>
</template>

<script>
import ParkingList from '@/components/ParkingList.vue' 


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
            return this.$store.getters.parkingToDisplay;
        }
    },
        components:{
            ParkingList
    },
}
</script>

<style>
</style>
