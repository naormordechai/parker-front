<template>
    <section>
        <!-- <input type="text" v-model="filterBy"> -->
                <input id="pac-input" type="text" ref="input"
                    placeholder="Enter a location">
                    <button @click="search">search</button>
    </section>
</template>

<script>
import { eventBus } from '../../services/EventBusService';

export default {
    data(){
        return {
            filterBy:'',
        }
    },
    mounted: async function(){
        var google  = await this.$gmapApiPromiseLazy()
        var input  = this.$refs.input
        var autocomplete = new google.maps.places.Autocomplete(input);

    },
    watch:{
        filterBy(){
            // pass new lat and lng
            eventBus.$emit('filter',this.filterBy)
        }
    },
    methods:{
        search(){
            var geocoder= new google.maps.Geocoder();
            var input  = this.$refs.input.value
            var loc=[];
            console.log('this.geocode',geocoder.geocode);
            
            // console.log('input',input);
            geocoder.geocode( { 'address': input}, function(results, status) {
      // and this is function which processes response
      if (status == google.maps.GeocoderStatus.OK) {
        loc[0]=results[0].geometry.location.lat();
        loc[1]=results[0].geometry.location.lng();

        console.log( {loc} ); // the place where loc contains geocoded coordinates

      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });

    // pretty meaningless, because it always will be []
    // this line is executed right after creating AJAX request, but not after its response comes
    return loc;
            
        }
    }
    
}
</script>

<style>
</style>
