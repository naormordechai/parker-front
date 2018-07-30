
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


export default {
  data() {
    return {
      message: '',
      userInfo :{
          email : '',
          password : ''
      }
    };
  },
  methods: {
      login () {
          if (!this.userInfo.email || !this.userInfo.password){
              this.message = 'please enter valid user'
              return 
          } 
              this.$store.dispatch({type: 'login', userInfo : this.userInfo})   
              .then (_=> {                  
                  this.$router.push('/parking')
                  })          
          },

          }
  }



</script>

<style>
.login input,
button {
  padding: 10px;
}
</style>
