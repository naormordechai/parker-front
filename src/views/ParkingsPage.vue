<template>
<section>
    <ParkingList :parkings ="parkings"/>
    <h1>helooooasdasd</h1>
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
