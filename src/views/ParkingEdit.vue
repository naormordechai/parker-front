<template>
    <section>
     <h1> Add New Parking </h1>
<!--     <button @click="isAddParking = true">Add Parking</button> -->
       <form @submit.prevent="addParking"> 
          <div v-if="isAddParking" class="add-parking">
            <div>
             <h3>Your Address:</h3>
            <input type="text" ref="placeAutocomplete">
 <!--           <input type="text" ref="placeAutocomplete" -- v-model="parkingToEdit.address" > -->
        
             </div>

            Price: <input type="number" min="1" v-model="parkingToEdit.price">
             IsCovered: <select v-model="parkingToEdit.amenities.isCovered">
                    <option value=false>false</option>
                    <option value=true>true</option>    
                    </select> 
            isPaved: <select v-model="parkingToEdit.amenities.isPaved">
                    <option value=true>true</option>    
                    <option value=false>false</option>
                    </select>
            isForDisable: <select v-model="parkingToEdit.amenities.isForDisable">
                    <option value=false>false</option>
                    <option value=true>true</option>    
                    </select> 
             <div class="flex align-center">
                <p>Descriptionp</p>
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="Please input"
                    v-model="parkingToEdit.description"
                    >
                    </el-input>     
            </div>
             Load Picture<input type="file" @change="loadPicture(this,event)" />
            ImagURL: <input type="string" v-model="parkingToEdit.imageURL">
            <button type="submit">Add!</button>
          </div>
        </form>
    </section>
</template>

<script>
//import VueGoogleAutocomplete from "vue-google-autocomplete";
import CloudinaryService from '../../services/CloudinaryService.js'
export default {
  props: ["parking"],
  name: "ParkingEdit",
  // components: { VueGoogleAutocomplete },
  data() {
    return {
      parkingToAdd: {
        location: {
          lat: "0",
          lng: "0"
        },
        address: "",
        occupiedUntil: "0",
        reserverId: "",
        ownerId: "5b583081f6d632e56ebd6a45",
        price: "0",
        amenities: {
          isCovered: false,
          isPaved: true,
          isForDisable: false
        },
        description: "",
        createdAt: 0,
        imageURL: ""
      },
      isAddParking: true
    };
  },
  computed: {
    parkingToEdit() {
      return this.parkingToAdd;
    },
    user() {
      return this.$store.getters.loggedInUser;
    }
  },
  mounted() {
    this.$gmapApiPromiseLazy().then(google => {
      var autocomplete = new google.maps.places.Autocomplete(
        this.$refs.placeAutocomplete
      );
      autocomplete.addListener("place_changed", x => {
          var place = autocomplete.getPlace();
          console.log({place})
          this.parkingToAdd.location.lat = place.geometry.location.lat();
          this.parkingToAdd.location.lng = place.geometry.location.lng();
          console.log(this.parkingToAdd.location.lat)
          console.log(this.parkingToAdd.location.lng)
          this.parkingToAdd.address = place.formatted_address;
      });
    });
  },

  methods: {
    addParking() {
      let newParking = this.parkingToEdit;
      if (this.isAddParking) {
        newParking.ownerId = this.user._id;
        console.log("ownerID:", newParking.ownerId);

        this.$store.dispatch({ type: "addParking", newParking });
       // this.isAddParking = false;
      }
    },

    loadPicture(elPic,ev){
      CloudinaryService.uploadImg(elPic, ev);
    }
  }
};
</script>

<style scoped lang="scss">
</style>


