<template>
    <section>
 
     <h1> Add New Parking </h1>
<!--     <button @click="isAddParking = true">Add Parking</button> -->
       <form @submit.prevent="addParking"> 
          <div v-if="isAddParking" class="add-parking">
            <div>
             <input placeholder="Please input Adress" type="text" ref="placeAutocomplete" class="el-input__inner">  
         <!-- <el-input placeholder="Please input Adress" type="text" ref="placeAutocomplete" />  -->
             </div>          
            <div>
            Price:  <el-input-number v-model="parkingToEdit.price" :min="1" ></el-input-number>
            </div>
             <el-checkbox v-model="parkingToEdit.amenities.isCovered">IsCovered</el-checkbox>
             <el-checkbox v-model="parkingToEdit.amenities.isPaved">isPaved</el-checkbox>
             <el-checkbox v-model="parkingToEdit.amenities.isForDisable">isForDisable</el-checkbox>
             <div class="flex align-center">
            <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="Please input Description"
                    v-model="parkingToEdit.description"
                    >
                    </el-input>     
            </div>
            <div>
              <input class="load-img-btn" type="file" id="LoadImageBtn" name="img"  method="POST"
               enctype="multipart/form-data" @change="loadImg($event.target, $event)"/>

               <label for="LoadImageBtn" class="el-button el-button--primary el-button--small">Load image</label>
            </div>
            
             <el-button type="success" @click="addParking">Confirm New Parking</el-button> 
            
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
      isAddParking: true,
      msg:''
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

        this.$store.dispatch({ type: "addParking", newParking })
        .then ((res) => {
          console.log('new parking added: ', res)
          // reditect to the parking details page with vue router.push 
        })
        .catch(err => {
          // show an error msg maybe with elment msg cmp.
        })
      }
    },
    loadImg(elPic,ev){
      // debugger
      
      CloudinaryService.uploadImg(elPic, ev).then(res =>{
          this.parkingToEdit.imageURL = res
          console.log(' this.parkingToEdit.imageURL',  this.parkingToEdit.imageURL);
          
      });
      
      
      //this.parkingToEdit.imageURL = newImg.url;
    }
  }
};
</script>

<style scoped lang="scss">

.load-img-btn{
    	width: 0.1px;
	height: 0.1px;
	opacity: 0;
	overflow: hidden;
	position: absolute;
	z-index: -1;
  
}
.el-textarea__inner{
      width: 300px;
}
</style>


