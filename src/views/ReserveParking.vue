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
            <p>Total Price: ₪ {{cost}}</p>       
            <!-- <button class="reserve-btn">Reserve Parking!</button> -->
             <el-button type="success" @click="reserveParking(parking)">Reserve Parking!</el-button>
            </form>
        </div>
    </section>
</template>

<script>
import ParkingService from "../../services/ParkingService.js";

export default {
  data() {
    return {
      hours: 1,
      parking: {
        location: {
          lat: 0,
          lng: 0
        }
      }
    };
  },
  created() {
    // this.initMarker()
    this.loadParking();
  },
  methods: {
    reserveParking(parking) {
      if (this.user._id === "" || this.user._id === false) {          
        this.$router.push("/login");
      } else {
        var occupiedUntil = Date.now() + this.hours * 60 * 60 * 1000;
        console.log("occupied until: ", occupiedUntil);
        parking.reserverId = this.user._id;
        parking._id = this.parking._id;
        parking.occupiedUntil = occupiedUntil;
        console.log("parking before reservation: ", parking);
        this.$store
          .dispatch({ type: "reserveParking", parking: parking })
          .then(res => {
            console.log("parking has been reserved!");
            this.$router.push(`/navigate/${parking._id}`)
          });
      }
    },
    loadParking() {    
      var parkingId = this.$route.params.id;
      console.log("this route URL: ", this.$route);
      ParkingService.getById(parkingId).then(res => {
        this.parking = res.parking;
      });
    }
  },
  computed: {
    cost() {
      return this.hours * this.parking.price;
    },
    user() {
      return this.$store.getters.loggedInUser;
    }
  }
};
</script>

<style>
.hours {
  display: block;
  margin: 10px auto;
  padding: 7px;
}
.reserve-btn {
  padding: 7px;
}
.reserve-details {
  margin: 20px 0;
}
.el-input-number {
  margin: 20px 0;
}
.el-button {
  margin: 20px;
}
h2 {
  margin-bottom: 20px;
}
</style>
