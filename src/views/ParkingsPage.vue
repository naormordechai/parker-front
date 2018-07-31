<template>
<section>
    <ParkingList :parkings ="parkings"/>
    </section>
</template>

<script>
import ParkingList from '@/components/ParkingList.vue' 
import LocService from '../../services/LocService'
import { eventBus } from '../../services/EventBusService';


export default {
    data(){
        return{
            filter :'',

        }
    },
    created: async function (){
        var userPosition = await LocService.getPosition()
        console.log({userPosition})
        var position = {
            lat :userPosition.coords.latitude,
            lng : userPosition.coords.longitude
        }

       this.$store.dispatch({type:'loadParkings',            
            lat :position.lat,
            lng : position.lng
        });


        // instead of this filter use the new lat and lng and and diptach loadParkings with them. 
        eventBus.$on('filter', (newFilter) => {
            this.filter = newFilter;
        });
    },
    computed:{
        parkings() {
            var parkings = this.$store.getters.parkingToDisplay
             if (this.filter === '') return parkings

            return parkings.filter(parking => {
                return parking.address.toLowerCase().includes(this.filter.toLowerCase())
            })
        }
    },
        components:{
            ParkingList
    },
}
</script>

<style>
</style>
