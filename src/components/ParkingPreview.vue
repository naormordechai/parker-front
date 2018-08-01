<template >
  <router-link class="text-decoration" :to="'parking/'+parking._id ">
    <section class="section-parking-preview">
        <el-card class="box-card" :class = "{occupied : isOccupied}">
        <div class="parking-box flex">
            <img class="img-parking mr" :src="parking.imageURL" alt="parking">
            <div class="parking-box-details flex column space-between">
                <h3>{{parking.address}}</h3>
                <p>price: {{parking.price}}₪</p>
                <p>{{distance}} km</p>
                <div class="flex space-around">
                    <p>{{parking.amenities.isCovered}}</p>
                </div>
                <div>
                    <el-button type="info">Details</el-button>
                    <el-button v-if="!isOccupied" type="success" :disabled="isOccupied" @click.prevent="$router.push('/reserve/'+parking._id)">
                            Reserve
                    </el-button>
                </div>
        </div>
            </div>
        </el-card>

    </section>
 </router-link>

</template>

<script>



export default {
    computed:{
        distance1(){
            // chekc the distnnace by compring the latlng of the parking 
            //
        },
        isOccupied(){
            return this.parking.occupiedUntil > Date.now()
        },
        distance(){
            var distance = this.parking.location.distance
            return distance.toFixed(1)
        }
    },
    methods: {
        onResrvedClick(){
            if (!this.isOccupied) $router.push('/reserve/'+parking._id)
        },
    },
    props:{
        parking:Object
    },
    
}
</script>

<style scoped lang="scss">
.img-parking {
  height: 150px;
  width: 150px;
}

.mr {
  margin-right: 20px;
}

.box-card:hover {
  background-color: rgb(217, 255, 181);
}

.occupied {
    background-color: rgb(219, 219, 219);
    opacity: .3;
        &:hover{
            background-color: rgb(219, 219, 219);
        }
}

</style>
