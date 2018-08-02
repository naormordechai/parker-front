<template>
    <section>
        <!-- <input type="text" v-model="filterBy"> -->
        <div class="flex">
                <input @keyup.enter="search" id="pac-input" class="input-location el-input__inner" type="text" ref="input"
                    placeholder="Enter a location">
                    </div>
                    <!-- <button @click="search">search</button> -->
                    <!-- <el-input placeholder="Entar a location" ref="input" id="pac-input"></el-input> -->
    </section>
</template>

<script>
import { eventBus } from '../../services/EventBusService';
import StorageService from '../../services/StorageService.js'

export default {
    data(){
        return {
            filterBy:'',
            loc:{},
            
        }
    },
    // props:{
    //     isMap:Boolean,
    // },
    mounted: async function(){
        var google  = await this.$gmapApiPromiseLazy()
        var input  = this.$refs.input
        var autocomplete = new google.maps.places.Autocomplete(input);

    },
    methods:{
        search(){
            var geocoder= new google.maps.Geocoder();
            var input  = this.$refs.input.value
            // if (input){
            //     this.$store.state.ParkingModule.search = true
            // }
            geocoder.geocode( { 'address': input}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.loc.lat=results[0].geometry.location.lat();
        this.loc.lng=results[0].geometry.location.lng();

        this.$store.commit('setPosition', this.loc)

       this.$store.dispatch({type:'loadParkings'});


      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    // pretty meaningless, because it always will be []
    // this line is executed right after creating AJAX request, but not after its response comes
    return this.loc;
            
        },
    }
    
}
</script>

<style scoped>
/* .input-location{
    width:100%;
} */

.icon-search{
    border: none;
    margin-left: -50px;
}

@media (max-width: 770px) {
  .btn-map {
    display: block;
  }
}
</style>
