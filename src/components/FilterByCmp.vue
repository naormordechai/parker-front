<template>
    <section class="filter">
        <div class="filter-by" @click="toggleFilter">
            <i class="fas fa-filter"></i>Filter
        </div>
        <div class="filter-container" v-if="isOpen">
            <div class="filter-options flex column">   
                    <p>Distance in km:</p>         
                    <el-slider v-model="filterBy.distance" show-input> </el-slider>            
                    <!-- <el-checkbox v-model="filterBy.distance">distance from me</el-checkbox> -->
                    <el-checkbox v-model="filterBy.isPaved">paved</el-checkbox>
                    <el-checkbox v-model="filterBy.isForDisabled">for disabled</el-checkbox>
                    <el-checkbox v-model="filterBy.isAvailable">available</el-checkbox>
                    <el-button type="success" @click="filter">Done</el-button>
            </div>            
        </div>
    </section>
</template>

<script>
export default {
    data () {
        return {
            filterBy: {
                isPaved: false,
                isForDisabled: false,
                distance: '',
                isAvailable: false
            },
            isOpen: false
        }            
    },
    methods: {
        filter() {
            console.log('filtering...')
            this.$store.commit({type:'update-filter', filterBy: this.filterBy})
        },
        toggleFilter() {
            this.isOpen = !this.isOpen
        }  
    }
    
}
</script>

<style scoped>

.filter-option {
    width: 100%
}

.filter-container {
    text-align: left;
    padding: 20px;
}
.el-checkbox {
    padding-bottom: 10px;
}

.filter-by {
    border-top: 1px solid lightgrey;
    border-bottom: 1px solid lightgrey;
    padding: 10px;
    margin: 0 20px;    
}
.filter-by:hover {
    cursor: pointer;
}

</style>
