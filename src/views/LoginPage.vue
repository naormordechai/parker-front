
<template>
    <section>
    Hello!!
    <h3>Login</h3>
    {{$store.getters.loggedInUser}}

    <div class="login">
                <form @submit.prevent="login">
                    <input type="text" v-model="email" placeholder="Insert your email"/>                   
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


export default {
  data() {
    return {
      email: '',
      message: ''
    };
  },
  methods: {
      login () {
          if ((!this.email)){
              this.message = 'please enter your email address'
              return 
          } 
              this.$store.dispatch({type: 'login', email:this.email})   
              .then (_=> {                  
                  this.$router.push('/parking')
                  })          
            //   .then ((user) => {
            //       console.log('user from store: ', user)
            //       this.message = user.firstName + ' logged in successfully!'
            //       this.email = ''
                  
            //   })
           
              
          }
      }
    // login(){
    //     this.$store.commit({type: 'setUser', user: {
    //         _id: 50505050,
    //         eMail: 'a@a.com',
    //         firstName: 'elad',
    //         lastName : 'frizi'
    //     }})
    // }
  }



</script>

<style>
.login input, button {
         padding: 10px;
}
</style>
