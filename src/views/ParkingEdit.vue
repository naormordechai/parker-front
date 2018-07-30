<template>
    <section>
     <h1> Add New Parking </h1>
     <button @click="isAddParking = true">Add Parking</button>
     <form @submit.prevent="addParking">
          <div v-if="isAddParking" class="add-parking">
            Address: <input type="text" v-model="parkingToEdit.address">
            <div>
        <h2>Your Address</h2>

            <vue-google-autocomplete
                ref="address"
                id="map"
                classname="form-control"
                placeholder="Please type your address"
                v-on:placechanged="getAddressData"
                country="sg"
            >
            </vue-google-autocomplete>
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

            ImagURL: <input type="string" v-model="parkingToEdit.imageURL">
            <button type="submit">Add!</button>
          </div>
        </form>
    </section>
</template>

<script>
import VueGoogleAutocomplete from 'vue-google-autocomplete'
export default {
    props:["parking"],
    name:"ParkingEdit",
    components: { VueGoogleAutocomplete },
    data(){
        return{
            parkingToAdd:{
                 location: {
                 lat : "0",
                 lng : "0"
            },
            address: "",
            occupiedUntil: "0",
            reserverId: "",
            ownerId: "5b583081f6d632e56ebd6a45",
            price: "0",
            amenities: {
                isCovered: false,
                isPaved: true,
                isForDisable: false,
            },
            description: "",
            createdAt: 0,
            imageURL: ""

            },
            isAddParking: false,
        }
    },
    computed:{
         parkingToEdit() {
        
         return this.parkingToAdd;
         },
         user() {
           return this.$store.getters.loggedInUser;
       }

    },
    methods:{
        addParking() {
        let newParking = this.parkingToEdit;
         if (this.isAddParking) {
            newParking.ownerId = this.user._id;
            console.log('ownerID:',newParking.ownerId);
             
            this.$store.dispatch({ type: "addParking", newParking });
            this.isAddParking = false;
           }
        }   
    }
    
}
</script>

<style scoped lang="scss">


</style>


