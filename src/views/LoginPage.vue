
<template>
    <section>
    <h3>Login</h3>
    <div class="login">
                <form @submit.prevent="login">
                    <input type="text" v-model="userInfo.email" placeholder="Insert your email"/>   
                    <input type="password" v-model="userInfo.password" placeholder="password"/>                
                    <button type="submit">Login</button>
                </form>
                <p>{{message}}</p>
        </div>
    <!-- <form type="submit" @click="login">
        <input type="text" v-model="email">
        <button>login</button>
        <input type="submit" value="Login" @click="login">
    </form> -->
    </section>
</template>

<script>

import UserService from '../../services/UserService.js'
import eventBus from '../../services/EventBusService.js'

export default {
  data() {
    return {
      message: '',
      userInfo :{
          email : '',
          password : ''
      },
    };
  },
  // this.status = this.$store.state.UserModuls.isAdmin;

  methods: {
      login () {
          console.log('4-00000',this.$store.state.UserModule.aboutUser);
          if (!this.userInfo.email || !this.userInfo.password){
              this.message = 'please enter valid user'
              return 
          } 

              this.$store.dispatch({type: 'login', userInfo : this.userInfo})   
              .then (_=> {                  
                  this.$router.push('/parking')
                  })          
          },

          },
          cretaed(){

          }
  }



</script>

<style>
.login input,
button {
  padding: 10px;
}
</style>
