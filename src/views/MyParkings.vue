<template>
    
    <section>
            <h2>My Details</h2>
                <!-- <h3>{{user.firstName}}</h3> -->
                <h2 class="my-parkings">My Parkings</h2>
                <ul>
                    <li v-for="parking in reservedParkings" :key="parking._id">
                    <div class="flex">
                            <el-card class="box-card">
                            <div class="flex">
                                <img class="parking-img" :src="parking.imageURL">
                                <div class="flex column">
                                <h3> {{parking.address}} </h3>
                            </div>
                           </div>
                            </el-card>
                            <el-card>
                                details about the owner!! 
                            </el-card>
                </div>
                            
                    </li>
                </ul>
    </section>

</template>

<script>
import ParkingService from '../../services/ParkingService';
import UserService from '../../services/UserService.js'


export default {
    data(){
        return{
        user : null,
        reservedParkings: [],
        ownedParkings: [],
        isAvilible:null
        }
    },
    methods:{
        loadParkingsActivity(){
            var userId = this.$route.params
            console.log('userID: ', userId)
            UserService.getUserById(userId)
            .then(res => {
                this.user = res.user;
                this.reservedParkings = res.reserveParkings
                console.log('user',this.user)
                this.ownedParkings = res.ownedParkings
            })
            
        },
    },
    created() {
        this.loadParkingsActivity()
    },
};
</script>

<style scoped>
.my-parkings{
    text-transform: uppercase;
    letter-spacing: 1px;
}
.parking-img{
    width: 200px;
    height: 200px;
    margin-right: 20px;
}
</style>
