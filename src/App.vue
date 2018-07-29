<template>
  <div id="app">
    <div id="nav">
      
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link v-if="loggedInUser._id" :to="`/user/${loggedInUser._id}`">My parkings</router-link> |
      <router-link v-if="!loggedInUser._id" to="/login">Login</router-link>
      <!-- <div class="welcome-user" v-if="loggedInUser">Hi {{loggedInUser.firstName}}</div> -->
      <div class="logout" v-if="loggedInUser._id" @click="logout">logout</div>

    </div>
    <router-view/>
  </div>
</template>

<script>


export default {
  data () {
    return {
      // user:'',
    }
  },
  computed: {
    // this.loadUser() 
    loggedInUser(){
      return this.$store.getters.loggedInUser
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

    }
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
}
#nav, {
  padding: 30px;
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
  text-decoration: underline
}
.logout:hover {
  cursor: pointer;
}

</style>
