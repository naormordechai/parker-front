<template>
<section>
    <!-- <ParkingFilter /> -->

    <ParkingList :parkings ="parkings"/>
    </section>
</template>

<script>
import ParkingList from '@/components/ParkingList.vue' 
import LocService from '../../services/LocService'
import DemoService from '../../services/DemoService.js'
// import ParkingFilter from '@/components/ParkingFilter.vue'


export default {
    data(){
        return{
            filter :'',

        }
    },
    methods: {
        showNewParking() {
        setTimeout(this.showNewParkingNotification, 6000)
        },
        showNewParkingNotification() {
            this.$notify({
            title: `We have great news for you!`,
            message: 'a new parking - at Anne Frank 16, Ramat Gan - was just added to the list! \
            Be the first to rent it',
            type: 'success', 
            duration: 8000                
            });
        },
        showAvailableParking() {
            setTimeout(this.showAvailableParkingMsg, 3000)            
        },
        showAvailableParkingMsg() {
            DemoService.addRandomParking()
            .then (res => {
                var parkingToAdd = res.data
                this.$store.commit({type: 'addNewParking', parkingToAdd: parkingToAdd})
                this.$notify({
                    title: `it's your lucky day!`, 
                    message: 'a new parking near your location has just become available! \
                    reserve it before it is occupied again',
                    type: 'success',   
                    duration: 8000                 
                })
            })
        }
    },
    created (){
       this.$store.dispatch({type:'loadParkings'});
       if (this.$root.demoDummyNotify) {
           this.showNewParking()
           this.showAvailableParking()
           this.$root.demoDummyNotify = false;
       }
    //    DemoService.addRandomParking()     

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
