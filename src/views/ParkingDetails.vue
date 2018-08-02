<template>
    <section v-if="parkingDetail">
<!-- <el-button-group class="box-btns-nav">
  <el-button @click="$router.push('/parking')" type="info" plain>List <i class="el-icon-arrow-right el-icon-more"></i></el-button>
  <el-button type="info" plain icon="el-icon-arrow-left">Previous Page</el-button>
  <el-button type="info" plain>Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
</el-button-group> -->
<!-- <div class="cards-details flex space-between">
    <el-card>
        <div>
           <p>{{parkingDetail.parking.address}}</p>
           <p>0.4 km</p>
           <p>₪ {{parkingDetail.parking.price}}</p>
        </div>
    </el-card>

    <el-card>
        <div>
            <p>{{parkingDetail.owner.firstName}}</p>
            <p>{{parkingDetail.owner.lastName}}</p>
            <p>{{parkingDetail.owner.eMail}}</p>
        </div>
    </el-card>
</div> -->
    <!-- <img class="img-parking-car" :src="parkingDetail.parking.imageURL" alt="parking">
        <el-card>
        <div>
            <p>avilible from</p>
        </div>
    </el-card> -->
            <!-- <el-card>
            <p>Amenties</p>
                <div class="box-amenties flex justify-content-c">
                    <p>{{parkingDetail.parking.amenities.isCovered}}</p> -->
                    <!-- <font-awesome-icon icon="wheelchair" />
                    <font-awesome-icon icon="road" /> -->
    <!-- </el-card> -->

    <!-- <el-card>
        <div>
            <p>{{parkingDetail.parking.description}}</p>
        </div>
    </el-card> -->
        
             <!-- <el-button @click="$router.push('/reserve/'+parkingDetail.parking._id)" 
             class="btn-reserve" type="success" :disabled="isOccupied">Reserve Now!</el-button> -->
<div class="section-details flex align-end">
    <el-card class="box-card">
        <h5 class="address">{{parkingDetail.parking.address}}</h5>
      <img :src="parkingDetail.parking.imageURL" class="parking-details-image image">
      <div style="padding: 25px;">
          <div class="parking-details column">
        <h5 class="to-know">things you should know</h5>
        <p>₪ {{parkingDetail.parking.price}}</p>
        <p>{{distance.toFixed(1)}}km </p>
        <p>{{parkingDetail.parking.description}}</p>
        <div>
            {{parkingDetail.parking.amenities.isCovered}}
            {{parkingDetail.parking.amenities.isCovered}}
            {{parkingDetail.parking.amenities.isCovered}}
        </div>
        </div>
        <div class="about-owner flex column space-between">
            <h5>About owner</h5>
            <p>{{parkingDetail.owner.firstName}} {{parkingDetail.owner.lastName}}</p>
            <p>{{parkingDetail.owner.eMail}}</p>
            <div>
                     <el-button @click="$router.push('/reserve/'+parkingDetail.parking._id)" 
             class="btn-reserve" type="success" :disabled="isOccupied">Reserve Now!</el-button>
            </div>
        </div>

        </div>

    </el-card>
<GmapMap
  :center="parkingDetail.parking.location"
  :zoom="16"
  map-type-id="terrain"
  style="flex:1; height: 85vh"
>
  <GmapMarker
    :position="parkingDetail.parking.location"
    :clickable="true"
    :draggable="false"
    @click="$router.push('/reserve')"
  />
</GmapMap>

</div>

    </section>
</template>

<script>

import ParkingService from '../../services/ParkingService.js'
import LocService from '../../services/LocService.js';

export default {
data(){
    return {
        parkingDetail:null,
        lat:0,
        lng:0,
        markers:[],
        distance: 0
    }
},
methods:{
    loadParkingId(){
        var parkingId = this.$route.params.id
        console.log('parkingId',parkingId)
        return ParkingService.getById(parkingId)
        .then(res => {
            console.log('res',res)
            this.parkingDetail = res
            console.log('parking detail:', this.parkingDetail)

        })
    },

    getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
          var R = 6371; // Radius of the earth in km
          var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
          var dLon = this.deg2rad(lon2-lon1); 
          var a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2); 
          var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
          var d = R * c; // Distance in km
          // return console.log('ddddd!!!',d + 'kilometers');
          return d;
    },
    deg2rad(deg) {
      return deg * (Math.PI/180)
    },


},
// created :async function(){
//         var parkingPrm = this.loadParkingId();
//         var locationPrm =  LocService.getPosition().then(pos => {
//             let lat = pos.coords.latitude;
//             let lng = pos.coords.longitude;
//             return {lat , lng}
//          })
//         var  [ _ , loc] = await Promise.all([parkingPrm, locationPrm])
// this.distance  = this.getDistanceFromLatLonInKm(
//         this.parkingDetail.parking.location.lat,
//         this.parkingDetail.parking.location.lng,
//         loc.lat,
//         loc.lng
//     )
        
//     },

    created : async function (){
        var parkignPrm = this.loadParkingId()
        var locationPrm = LocService.getPosition()
        .then(pos => {
            // console.log('pos me',pos.coords);
            let lat = pos.coords.latitude
            let lng = pos.coords.longitude
            // console.log('pos me ',{lat:lat, lng:lng});
            return {lat , lng}
        })
        var [_ , loc] = await Promise.all([
            parkignPrm,locationPrm
        ])
        this.distance = this.getDistanceFromLatLonInKm(
            this.parkingDetail.parking.location.lat,
            this.parkingDetail.parking.location.lng,
            loc.lat,
            loc.lng
        )

    },
    computed:{
        isOccupied(){
            return this.parkingDetail.parking.occupiedUntil > Date.now()
        },

    }
}
</script>

<style scoped lang="scss">
.parking-details-image {
    max-width: 80%;
}
 .section-details .box-card{
    //  background-color: red;
     max-width: 450px;
     padding: 0;
     height: 85vh;
}

.x .el-card__body{
    // padding: 0;
}

/* menu-bar */
.menu-bar {
  border: 1px solid gray;
}

.address{
    margin-bottom: 10px;
}

.menu-bar > * {
  height: 30px;
  line-height: 28px;
}

/* card-details */
// .cards-details > * {
//   flex-basis: 50%;
// }

/* img-parking */
.img-parking-car {
  width: 50%;
  height: 300px;
  object-fit: cover;
}

/* amenties */
.box-amenties > *:not(:last-child) {
  margin-right: 20px;
}
.box-amenties {
  margin-top: 15px;
}

/*buttons */
.btn-reserve {
//   width: 350px;
//   margin-top: 30px;
//   position: fixed;
//   top: 88%;
//   left: 30%;
width: 100%;
margin-top: 10px;
}

/*details */
.parking-details {
  text-align: left;
  .to-know{
      padding: 10px 0;
  }
}

.parking-details > *:not(:last-child){
    margin-bottom: 5px;
}

.about-owner{
    padding-top: 15px;
    text-align: start;
}

.about-owner > *:not(:last-child){
    margin-bottom: 5px;
}

</style>
