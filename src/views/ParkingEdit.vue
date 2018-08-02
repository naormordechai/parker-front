<template>
    <section class="parking-section">
 
<!--     <button @click="isAddParking = true">Add Parking</button> -->
       <form @submit.prevent="addParking" class="add-parking-form" > 
          <h3> Add New Parking </h3>
          <div v-if="isAddParking" class="add-parking">
            <div class="add-margin">
             <input placeholder="Please input Adress" type="text" ref="placeAutocomplete" class="el-input__inner">  
         <!-- <el-input placeholder="Please input Adress" type="text" ref="placeAutocomplete" />  -->
             </div>          
            <div>
            <p>Price:</p>  <el-input-number v-model="parkingToEdit.price" :min="1" ></el-input-number>
            </div>
            <div class="add-margin">
             <el-checkbox v-model="parkingToEdit.amenities.isCovered">IsCovered</el-checkbox>
             <el-checkbox v-model="parkingToEdit.amenities.isPaved">isPaved</el-checkbox>
             <el-checkbox v-model="parkingToEdit.amenities.isForDisable">isForDisable</el-checkbox>
             </div>
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
              <input class="load-img-btn" type="file" id="LoadImageBtn" name="img"
               @change="loadImg($event.target, $event)"/>
              

               <label for="LoadImageBtn" class="load-img-lbl el-button el-button--primary el-button--small">{{fileLabelTxt}}</label>
            </div>
            
             <el-button type="success" @click="addParking">Confirm New Parking</el-button> 
            
          </div>
        </form>


        
    </section>
</template>

<script>
//import VueGoogleAutocomplete from "vue-google-autocomplete";
import CloudinaryService from "../../services/CloudinaryService.js";



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
        imageURL: "http://res.cloudinary.com/parker1/image/upload/v1533190733/e8iuj1et9h7mwylwhe5x.jpg"
      },
      isAddParking: true,
      fileLabelTxt: "Load Image",
      
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

    //for loading map
    this.$gmapApiPromiseLazy().then(google => {
      var autocomplete = new google.maps.places.Autocomplete(
        this.$refs.placeAutocomplete
      );
      autocomplete.addListener("place_changed", x => {
        var place = autocomplete.getPlace();
        console.log({ place });
        this.parkingToAdd.location.lat = place.geometry.location.lat();
        this.parkingToAdd.location.lng = place.geometry.location.lng();
        console.log(this.parkingToAdd.location.lat);
        console.log(this.parkingToAdd.location.lng);
        this.parkingToAdd.address = place.formatted_address;
      });
    });
  },

  methods: {
    addParking() {
      if (this.user._id === "" || this.user._id === false) {
        this.$router.push("/login");
      } else {
        if (!this.parkingToAdd.address){
          console.log("Address is empty, please add address!");
          this.addressIsEmpty();

        } else {
        let newParking = this.parkingToEdit;
        if (this.isAddParking) {
          newParking.ownerId = this.user._id;
          console.log("ownerID:", newParking.ownerId);

          this.$store
            .dispatch({ type: "addParking", newParking })
            .then(res => {
              console.log("new parking added: ", res);
              console.log("res._id: ", res._id);
              // reditect to the parking details page with vue router.push
              this.$router.push(`/parking/${res._id}`);
              //console.log('_id:',this.$store.state.parkings[0]._id);
            })
            .catch(err => {
              // show an error msg maybe with elment msg cmp.
              this.failedToCreate() 
              
            });
         }
        }

      }
      
    },
    addressIsEmpty() {
        this.$alert('The address is empty, please add address', 'Alert', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },

      failedToCreate() {
        this.$alert('Failed to save parking, please try later', 'Alert', {
          confirmButtonText: 'OK',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
    loadImg(elPic, ev) {
      // debugger

      CloudinaryService.uploadImg(elPic, ev).then(res => {
        this.parkingToEdit.imageURL = res;
        console.log(
          " this.parkingToEdit.imageURL",
          this.parkingToEdit.imageURL
        );
      });

      this.fileLabelTxt = ev.target.value.split( '\\' ).pop();
      if(!this.fileLabelTxt) this.fileLabelTxt = "Load Image";
      
      //this.parkingToEdit.imageURL = newImg.url;
    }
  }
};
</script>

<style scoped lang="scss">
h3{
  color: #2c3e50
}
p{
  color: #409EFF;
}
.load-img-btn {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.load-img-lbl,.add-margin{
  margin: 10px
}
.el-textarea__inner {
  width: 300px;
}

.parking-section{
  text-align: center;
}

.add-parking-form{
  width: 300px;
  display: inline-block;
  justify-content:center;
  align-items: center;
  border-style: solid;
  border-width: 1px;
  border-color:lightsteelblue;
  padding: 10px;
  
}
</style>


