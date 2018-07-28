<template>
    <section class="reserve-parking">
        {{parking}}
        <GmapMap
            :center="parking.location"
            :zoom="15"
            map-type-id="terrain"
            style="height: 300px"
            >
        <GmapMarker   
                 
            :position="parking.location"
            :clickable="true"
            :draggable="true"
            @click="center=m.position" />
        </GmapMap>
        <div class="reserve-details">
            <p>How many hours?</p>
            <form submit="setParkingDuration">
            <el-input-number v-model="hours" :min="1" :max="10"></el-input-number>
            <!-- <input v-model="hours" class="hours" type="number" min="1" placeholder="number of hours" />  -->
            <p>Total Price: ${{cost}}</p>       
            <!-- <button class="reserve-btn">Reserve Parking!</button> -->
             <el-button type="success" @click="reserveParking">Reserve Parking!</el-button>
            </form>
        </div>
    </section>
</template>

<script>
import ParkingService from '../../services/ParkingService.js'

export default {
    
    data () {
        return {
          hours: 1,
          parking: {
              location: {
                  lat:0,
                  lng:0
            },
            // markers: [
            //     {lat:32.003,lng:31.334},
            //     {lat:35.3,lng: 32.3}
            // ]
          }         
         }
    },
    created(){
        // this.initMarker() 
        this.loadParking()
        
               
    },
    methods: {
        reserveParking() {
            var occupiedUntil = Date.now() + this.hours * 60 * 60 * 1000
            var reservedParking = {
                reserverId: '5b583081f6d632e56ebd6a43',
                parkingId: this.parking._id,
                occupiedUntil: occupiedUntil
            }
            ParkingService.reserveParking(reservedParking)
            .then ((res)=> {
                console.log('parking has been reserved!')
            })
            
        },
        loadParking() {
            var parkingId = this.$route.params.id
            ParkingService.getById(parkingId)
            .then (res=> {
                this.parking = res.parking
            })
        }

    },
    computed: {
        cost() {
            return this.hours * this.parking.price
        },
       
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
    .el-input-number {
        margin: 20px 0;
    }
    .el-button{
        margin: 20px;
    }
</style>
