<template>
    <section v-if="parkingDetail">
        <div class="flex">
            <div>List</div>
            <div>Prev</div>
            <div>Nexts</div>
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
        ParkingService.getById(parkingId)
        .then(res => {
            this.parkingDetail = res
        })
    }
},
created(){
        this.loadParkingId()
    }
}
</script>

<style scoped>
ul{
    list-style: none;
}
</style>
