<template>
    <section class="reserve-parking">
        <!-- {{parking}} -->
        <h2>{{parking.address}}</h2>
        
        <GmapMap
            :center="parking.location"
            :zoom="17"
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
            }                     
          }         
         }
    },
    created(){
        // this.initMarker() 
        this.loadParking()
       
               
    },
    methods: {
        reserveParking() {
            if (this.user._id === '' || this.user._id === false) {
                this.$router.push('/login')
            } else {           
            var occupiedUntil = Date.now() + this.hours * 60 * 60 * 1000
            var reservedParking = {
                reserverId: this.user._id,
                parkingId: this.parking._id,
                occupiedUntil: occupiedUntil
            }
            ParkingService.reserveParking(reservedParking)
            .then ((res)=> {
                console.log('parking has been reserved!')
            })
            }
        },
        loadParking() {
            var parkingId = this.$route.params.id
            ParkingService.getById(parkingId)
            .then (res=> {
                this.parking = res.parking
            })
        },
        

    },
    computed: {
        cost() {
            return this.hours * this.parking.price
        },
       user() {
           return this.$store.getters.loggedInUser
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
    .el-input-number {
        margin: 20px 0;
    }
    .el-button{
        margin: 20px;
    }
    h2 {
        margin-bottom: 20px;
    }
</style>
