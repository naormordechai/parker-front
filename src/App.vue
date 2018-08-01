<template>
  <div id="app">
    <!-- <keep-alive>
    <component :is="x"></component>
    </keep-alive> -->
    <!-- <ParkingFilter /> -->
    <div id="nav">
  <div>
    <el-menu class="el-menu-demo flex" mode="horizontal" 
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b">
    <div class="main-menu flex space-between">
      <div class="flex">
          <router-link  to="/"><el-menu-item index="1">Home</el-menu-item></router-link>
          <router-link  to="/about"><el-menu-item index="2">About</el-menu-item></router-link>
          <router-link to="/parking/add"><el-menu-item index="3">add parking</el-menu-item></router-link> 
          <router-link v-if="!loggedInUser._id" to="/login"><el-menu-item index="4">Login</el-menu-item></router-link>
          <router-link v-if="loggedInUser._id" :to="`/user/${loggedInUser._id}`"><el-menu-item index="5">my parkings</el-menu-item></router-link>
          <div class="logout" v-if="loggedInUser._id" @click="logout"><el-menu-item index="6">Logout</el-menu-item></div>
      </div>
      <router-link :to="`/user/${loggedInUser._id}`">
       <button v-show="loggedInUser.firstName" class="profile-icon">{{nameInitials}}</button>
      </router-link>
    </div>   

</el-menu>

</div> 
    </div>
    <router-view/>  
<FooterCmp /> 
  </div>

</template>
<script>

import FooterCmp from '@/components/FooterCmp.vue' 
// import ParkingFilter from '@/components/ParkingFilter.vue'

export default {
  data () {
    return {

    }
  },
  computed: {
    // this.loadUser() 
    loggedInUser(){
      return this.$store.getters.loggedInUser
    },
    nameInitials() {
      return this.loggedInUser.firstName.charAt(0) + this.loggedInUser.lastName.charAt(0)
    }
  },

  methods: {
    // loadUser() {
    //   loggedInUser = this.$store.getters.loggedInUser
    //   .then (user => {
    //     console.log('logged in user brought from store: ', user)
    //     this.user = user
    //   })

    // }
    logout() {
      this.$store.dispatch({type:'logout'})
      localStorage.removeItem('loggedInUser')
      this.$router.push('/login')

    },
  },
  components:{
    FooterCmp,
    // ParkingFilter
  }
}

</script>


<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
}
#nav, {
  // padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logout{
  display: inline; 
  font-weight: bold;
  text-decoration: underline;
  &:hover {
    cursor: pointer;
  }
}
// .logout:hover {
//   cursor: pointer;
// }

.inline-block{
  display: inline-block;
}

.footer-app{
  padding: 50px;
  width: 100%;
}

.footer-list-details a{
  color: black;
  text-decoration: none;
}

footer {
  background-image: linear-gradient(to bottom, 
  rgba(238, 238, 238, 0.5)5%,
  rgba(97, 97, 97, 0.8))
}

footer p {
  padding-bottom: 30px;
}

.profile-icon {
  border-radius: 50%;
  border: none;
  height: 40px; 
  width: 40px;
  margin-right: 10px;
  text-transform: uppercase;
  outline: none;
  &:hover {
    cursor: pointer;
    background-color: rgba(168, 168, 168, 0.377);
    color: white;
    transition: 0.3s
  }

}

.main-menu {
  justify-content: center;
  align-items: center;
  width:100%;
}

</style>
