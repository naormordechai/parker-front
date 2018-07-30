<template>

    <section v-if="parkingDetail">
        <div class="container">
<el-button-group class="box-btns-nav">
  <el-button @click="$router.push('/parking')" type="info" plain>List <i class="el-icon-arrow-right el-icon-more"></i></el-button>
  <el-button type="info" plain icon="el-icon-arrow-left">Previous Page</el-button>
  <el-button type="info" plain>Next Page<i class="el-icon-arrow-right el-icon-right"></i></el-button>
</el-button-group>
<div class="cards-details flex space-between">
    <el-card>
        <div>
           <p>{{parkingDetail.parking.address}}</p>
           <p>0.4 km</p>
           <p>${{parkingDetail.parking.price}}</p>
        </div>
    </el-card>

    <el-card>
        <div>
            <p>{{parkingDetail.owner.firstName}}</p>
            <p>{{parkingDetail.owner.lastName}}</p>
            <p>{{parkingDetail.owner.eMail}}</p>
        </div>
    </el-card>
</div>
    <img class="img-parking-car" :src="parkingDetail.parking.imageURL" alt="parking">
        <el-card>
        <div>
            <p>avilible from</p>
        </div>
    </el-card>
            <el-card>
        <div>
            <p>Amenties</p>
                <div class="box-amenties flex justify-content-c">
                    <p>{{parkingDetail.parking.amenities.isCovered}}</p>
                    <!-- <font-awesome-icon icon="wheelchair" />
                    <font-awesome-icon icon="road" /> -->
                </div>
        </div>
    </el-card>

    <el-card>
        <div>
            <p>{{parkingDetail.parking.description}}</p>
        </div>
    </el-card>
        
             <el-button @click="$router.push('/reserve/'+parkingDetail.parking._id)" 
             class="btn-reserve" type="success" :disabled="isOccupied">Reserve Now!</el-button>

    </div>
    </section>
</template>

<script>

import ParkingService from '../../services/ParkingService.js'

export default {
data(){
    return {
        parkingDetail:null
    }
},
methods:{
    loadParkingId(){
        var parkingId = this.$route.params.id
        console.log('asdasdas',parkingId)
        ParkingService.getById(parkingId)
        .then(res => {
            console.log('res',res)
            this.parkingDetail = res

        })
    },

},
created(){
        this.loadParkingId()
        
    },
    computed:{
        isOccupied(){
            return this.parkingDetail.parking.occupiedUntil > Date.now()
        }
    }
}
</script>

<style scoped>
/* menu-bar */
.menu-bar {
  border: 1px solid gray;
}

.menu-bar > * {
  height: 30px;
  line-height: 28px;
}

/* card-details */
.cards-details > * {
  flex-basis: 50%;
}

/* img-parking */ 
.img-parking-car {
  width: 50%;
  height: 300px;
}

/* amenties */
.box-amenties > *:not(:last-child){
    margin-right: 20px;
}
.box-amenties{
    margin-top: 15px;
}

/*buttons */
.btn-reserve{
    width: 350px;
    margin-top: 30px;
    position: fixed;
    top: 88%;
    left:30%
}


</style>
