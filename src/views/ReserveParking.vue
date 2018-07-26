<template>
    <section class="reserve-parking">
        <GmapMap
            :center="{lat: 32.0749831, lng: 34.9120554}"
            :zoom="15"
            map-type-id="terrain"
            style="height: 300px"
            >
        <GmapMarker           
            :position="reservedParking"
            :clickable="true"
            :draggable="true"
            @click="center=m.position" />
        </GmapMap>
        <div class="reserve-details">
            <p>How many hours?</p>
            <form submit="setParkingDuration">
            <input v-model="hours" class="hours" type="number" placeholder="number of hours" />        
            <button class="reserve-btn">Reserve Parking!</button>
            </form>
        </div>
    </section>
</template>

<script>
import ParkingService from '../../services/ParkingService.js'

export default {
    
    data () {
        return {
          hours: 0,
          reservedParking: {
              lat: 0,
              lng: 0
          }
         }
    },
    created(){
        this.initMarker()        
    },
    methods: {
        setParkingDuration() {
        },
        initMarker() {            
            var parkingId = this.$route.params
            console.log('parking ID: ', parkingId)
            ParkingService.getById(parkingId)
            .then (res=> {
                this.reservedParking = res.location
                console.log('reserved parking: ', this.reservedParking)
                console.log('res location: ', res.location)
            })
        }

    }
}
</script>

<style>
    .hours  {
        display: block;
        margin: 10px auto;
        padding: 7px;       
    }
    .reserve-btn {
        padding: 7px;
    }
    .reserve-details {
        margin: 20px 0
    }
</style>
