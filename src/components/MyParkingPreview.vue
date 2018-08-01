<template>
    <li>                         
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
                    </div>
                    <div class="parking-properties flex column space-between">                                            
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
    </li>
</template>

<script>
import moment from 'moment';

export default {
    name: 'my-parking-preview',
    props: ['parking'],
  data () {
    return {
        mapView: false
    }
  },

  methods: {
    convertTimestamp (timestamp) {
            return moment(timestamp).fromNow();;
    },
    stopParking() {
        this.$emit('stop-parking', this.parking)
    }
  },

  created() {
   
  }

};
</script>

<style>

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
