<template>
    <section class="section-parking-preview">
        <el-card class="box-card">
        <div class="parking-box flex">
            <img class="img-parking mr" :src="parking.imageURL" alt="parking">
            <div class="parking-box-details flex column space-between">
                <h3>{{parking.address}}</h3>

                <p>price: {{parking.price}}$</p>
                <p>0.2 km</p>
                <div class="flex space-around">
                    <p>{{parking.amenities.isCovered}}</p>
                </div>
                <div>
                    <el-button type="info">Details</el-button>
                    <el-button @click.prevent="$router.push('/reserve')" type="success">Reserve</el-button>
                </div>
        </div>

   
            </div>
</el-card>

    </section>
</template>

<script>

export default {
    props:{
        parking:Object,

    },
}
</script>

<style scoped>


.img-parking{
    height: 150px;
    width: 150px;
}

.mr{
    margin-right: 20px;
}

.box-card:hover{
    background-color: rgba(231, 231, 231, 0.192);
}

</style>
