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
            parkings:[]
        }
    },
    methods:{
        loadParkings(){
            return ParkingService.query()
            .then(res => {
                this.parkings = res
            })
        }
    },
    created(){
        this.loadParkings()
    },
        components:{
        ParkingList
    },
}
</script>

<style>
</style>
