<template>   

    <section v-if="user">

         <el-tabs type="border-card">
            <el-tab-pane label="Reserved Parkings">
                 <div v-show="reserved" class="reserved-parkings">           
                    <h2 v-if="reservedParkings.length > 0">My Reserved Parkings:</h2>
                    <ul>
                        <my-parking-preview v-for="parking in reservedParkings" :key="parking._id"
                            :parking="parking"
                            @stop-parking="stopParking">

                        </my-parking-preview>
                        <!-- <li v-if="parking.occupiedUntil !== 0" v-for="parking in reservedParkings" :key="parking._id">                         
                            <router-link class="no-underline" :to="`/parking/${parking._id}`">
                                <el-card class="box-card">
                                    <div class="flex">
                                        <div class="parking-image">                                  
                                            <img  :src="parking.imageURL">
                                            <div class="google-maps" :class="{'hidden-map': !mapView}">                                   
                                                <GmapMap
                                                    :center="parking.location"
                                                    :zoom="15"
                                                    map-type-id="terrain"
                                                    style="width: 100%; height: 100%"
                                                >
                                                <GmapMarker                                               
                                                    :position="parking.location"
                                                    :clickable="true"
                                                    :draggable="false"
                                                    @click.prevent="center=m.position" />
                                                </GmapMap> 
                                            </div>
                                            <button class="toggle-map-btn" @click.prevent="mapView = !mapView"></button>            
                                        </div> -->
                                        <!-- <div class="google-maps">                                   
                                            <GmapMap
                                                :center="parking.location"
                                                :zoom="15"
                                                map-type-id="terrain"
                                                style="width: 300px"
                                            >
                                            <GmapMarker                                               
                                                :position="parking.location"
                                                :clickable="true"
                                                :draggable="false"
                                                @click.prevent="center=m.position" />
                                            </GmapMap> 
                                        </div>                                        -->
                                        <!-- <div class="parking-properties flex column space-between">                                            
                                                <ul class="parking-details">
                                                    <li><i class="fas fa-map-marker-alt"></i> {{parking.address}}</li>
                                                    <li><i class="fas fa-dollar-sign"></i>  ₪ {{parking.price}} per hour</li>
                                                    <li><i class="far fa-clock"></i>  ends {{convertTimestamp(parking.occupiedUntil)}}</li>                                                    
                                                </ul>                                      
                                                <div>
                                                <el-button type="success" @click.prevent="stopParking(parking)">Stop Parking</el-button>  
                                                </div>
                                        </div>                                        
                                    </div>
                                </el-card> 
                            </router-link>                          
                        </li> -->
                    </ul>
                </div>

            </el-tab-pane>

            <el-tab-pane label="Owned Parkings">
                 <div class="owned-parkings">
                    <h2>My Owned Parkings</h2>
                    <ul>
                        <my-parking-preview v-for="parking in ownedParkings" :key="parking._id"
                            :parking="parking"
                            @stop-parking="stopParking">

                        </my-parking-preview>
                        <!-- <li v-for="parking in ownedParkings" :key="parking._id">
                            <router-link class="no-underline" :to="`/parking/${parking._id}`">
                                <el-card class="box-card">
                                    <div class="flex space-between">
                                        <img  :src="parking.imageURL">
                                        <GmapMap
                                            :center="parking.location"
                                            :zoom="15"
                                            map-type-id="terrain"
                                            style="width: 300px"
                                        >
                                        <GmapMarker                                               
                                            :position="parking.location"
                                            :clickable="true"
                                            :draggable="false"
                                            @click.prevent="center=m.position" />
                                        </GmapMap>
                                        <div class="flex column space-between">                                            
                                                <ul class="parking-details">
                                                    <li><i class="fas fa-map-marker-alt"></i> {{parking.address}}</li>
                                                    <li><i class="fas fa-dollar-sign"></i>  ₪ {{parking.price}} per hour</li>
                                                    <li><i class="far fa-clock"></i>  ends {{convertTimestamp(parking.occupiedUntil)}}</li>                                                    
                                                </ul>                                      
                                            <div>
                                              <el-button type="success" @click.prevent="stopParking(parking)">Stop Parking</el-button>  
                                            </div>
                                        </div>                                        
                                    </div>
                                </el-card>
                            </router-link>
                        </li> -->
                    </ul>
                </div>
            </el-tab-pane> 

            <el-tab-pane label="Profile">
               <div class="my-details">
                     <h2>My Details</h2>
                     <el-card class="box-card flex space-between">
                        <div class="profile-image" :style="{backgroundImage: `url(./img/app/user.jpg)`}"></div>
                        <div class="profile-details flex column">
                            <p>Name: {{user.firstName}} {{user.lastName}}</p>
                            <p>email: {{user.eMail}}</p>
                        </div>                        
                     </el-card>
               </div>
            </el-tab-pane>  

        </el-tabs>


    </section>

</template>

<script>
import ParkingService from '../../services/ParkingService';
import UserService from '../../services/UserService.js';
import myParkingPreview from '@/components/MyParkingPreview';
import moment from 'moment'



export default {
    data(){
        return{
        user : null,
        reservedParkings: null,
        ownedParkings: null
        // isAvailable:null
        }
    },
    methods:{
        loadParkingsActivity(){
            console.log('route params userId: ', this.$route.params.userId)
            var userId = this.$route.params.userId
            console.log('userID: ', userId)
            UserService.getUserById(userId)
            .then(res => {
                this.user = res.user;
                this.reservedParkings = res.reservedParkings                               
                this.ownedParkings = res.ownedParkings                
            })            
        },
        convertTimestamp (timestamp) {
            return moment(timestamp).fromNow();;
        },
        stopParking (parking) {
           return this.$store.dispatch({type:'stopParking', parking: parking})
           .then (()=> {
               this.reservedParkings.filter(parking => parking._id !== parking._id)
           })
        }
    },
    created() {
        this.loadParkingsActivity()
    },
    computed:{
        reserved() {
            console.log('my reserved parkings: ',this.reservedParkings)
            return this.reservedParkings.length > 0
        }
    },
    components: {
        myParkingPreview
    }
};
</script>

<style scoped lang="scss">

.parking-details {
    text-align:left;   
}

.parking-details li{
    margin-bottom: 10px;
}

.my-parkings{
    text-transform: uppercase;
    letter-spacing: 1px;
}
.parking-img{
    width: 200px;
    height: 200px;
    margin-right: 20px;
}
.reserved-parkings, .my-details {
    margin-bottom: 20px;
}

.no-underline {
    text-decoration: none;
}
.el-tabs {
    max-width: 1000px;
    margin: auto
}

section {
    margin-top: 30px;
}

h2 {
    margin-bottom: 10px;
}

img {    
     box-shadow: 0px 1px 2px 2px #60626673;
}

.el-button {
    width:100%;
}
.profile-image {
    width: 200px;
    height: 200px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
}

.parking-image {
    position: relative;
}

.google-maps {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}

.toggle-map-btn {
    position: absolute;
    bottom: 15px;
    right: 15px;
    background-color: hotpink;
    outline: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
}

.hidden-map {
    z-index: -1;
}


</style>
