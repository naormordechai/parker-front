<template>
    <section>
     <h1> Add New Parking </h1>
     <button @click="isAddParking = true">Add Parking</button>
     <form @submit.prevent="addParking">
          <section v-if="isAddParking" class="add-parking">
            Address: <input type="text" v-model="parkingToEdit.address">
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
            Description: <input type="text" v-model="parkingToEdit.description">
            ImagURL: <input type="string" v-model="parkingToEdit.imageURL">
            <button type="submit">Add!</button>
          </section>
        </form>
    </section>
</template>

<script>
export default {
    props:["parking"],
    name:"ParkingEdit",
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
            ownerId: "",
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
         }
    },
    methods:{
        addParking() {
        let newParking = this.parkingToEdit;
         if (this.isAddParking) {
            this.$store.dispatch({ type: "addParking", newParking });
            this.isAddParking = false;
           }
        }   
    }
    
}
</script>

<style scoped lang="scss">

</style>


