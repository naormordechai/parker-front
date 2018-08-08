<template>
    <section>
        <div class="flex">
<<<<<<< HEAD:src/components/ParkingFilter.vue
                <input @keyup.enter="search" id="pac-input" class="input-location el-input__inner" type="text" ref="input"
                    placeholder="Enter a location">
                    </div>
=======
                <input @keyup.enter="search" id="pac-input" class="input-location el-input__inner"
                 type="text" ref="input" placeholder="Enter a location">
        </div>
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04:src/components/Search-cmp.vue
    </section>
</template>

<script>
import StorageService from '../../services/StorageService.js'

export default {
    data(){
<<<<<<< HEAD:src/components/ParkingFilter.vue
        return {
            loc:{},
        }
    },

=======
        return {            
            loc:{}            
        }
    },    
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04:src/components/Search-cmp.vue
    mounted: async function(){
        var google  = await this.$gmapApiPromiseLazy()
        var input  = this.$refs.input
        var autocomplete = new google.maps.places.Autocomplete(input);
    },
    methods:{
        search(){
            var geocoder = new google.maps.Geocoder();
            var input  = this.$refs.input.value
<<<<<<< HEAD:src/components/ParkingFilter.vue

=======
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04:src/components/Search-cmp.vue
            geocoder.geocode( { 'address': input}, (results, status) => {
      if (status === google.maps.GeocoderStatus.OK) {
        this.loc.lat=results[0].geometry.location.lat();
        this.loc.lng=results[0].geometry.location.lng();

        this.$store.commit('setPosition', this.loc)

       this.$store.dispatch({type:'loadParkings'});


      } else {
        alert("Geocode was not successful for the following reason: " + status);
<<<<<<< HEAD:src/components/ParkingFilter.vue
      }
    });
    return this.loc;
=======
              }
         });
>>>>>>> 806fdf7bbc16896596244122f96c2b2d2361ed04:src/components/Search-cmp.vue
            
    },
    }
    
}
</script>

<style scoped>

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
