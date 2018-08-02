
<template>
    <section>
        
        <el-tabs type="border-card">
            <el-tab-pane label="Login">
                <div class="login">
                    <h3>Login to your account</h3>
                    <form @submit.prevent="login">
                        <input type="text" v-model="userInfo.email" placeholder="Insert your email"/>   
                        <input type="password" v-model="userInfo.password" placeholder="password"/>                
                        <el-button type="success" @click="login">Login</el-button>
                    </form>
                    <p>{{message}}</p>
                 </div>
            </el-tab-pane>

            <el-tab-pane label="Signup">
                <div class="signup">
                    <h3>Create a new account</h3>
                    <form @submit.prevent="signup">
                   <input type="text" v-model="newUser.firstName" placeholder="Insert your First Name:"/>   
                     <input type="text" v-model="newUser.lastName" placeholder="Insert your Last Name:"/>   
                    <input type="email" v-model="newUser.email" placeholder="Insert your email:"/>   
                     <input type="password" v-model="newUser.password" placeholder="Set Password"/>                
                        <el-button type="success" @click="signup">Sign me Up!</el-button>
                    </form>
                    <p>{{message}}</p>
                 </div>
            </el-tab-pane>        
        </el-tabs>


   
    
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
      newUser: {
          firstName: '',
          lastName: '',
          email: '',
          password:''
      }
    };
  },
  // this.status = this.$store.state.UserModuls.isAdmin;

  methods: {
      login () {
        //   UserService.login(this.userInfo).then(
        //       result=>{
        //           console.log('71:success')
        //       }).catch (err => console.log('72-error:',err));

              
          
          console.log('4-00000',this.$store.state.UserModule.aboutUser);

          if (!this.userInfo.email || !this.userInfo.password){
              this.message = 'please enter valid user'
              
          } else

              this.$store.dispatch({type: 'login', userInfo : this.userInfo})   
              .then (_=> {  
                  console.log('85-login:',_);
                                                
                  this.$router.go(-1)                 
                  })
                  .catch ((err => this.message = 'no such user'))          
          },
        signup() {
            console.log('user signed up')
                if (!this.newUser.firstName || !this.newUser.lastName || 
                !this.newUser.email || !this.newUser.password) {
                    this.message = 'Please insert all details'
                    return
                }               
                this.$store.dispatch({type: 'signup', newUser : this.newUser}) 
                .then (_=> {
                    this.$router.push('/parking')
                })
                .catch(err => {
                    console.log('error creating new user: ', err)
                })  
            }                      
        },
          created() {                          
          }
  }



</script>

<style scoped>
.login input,
button {
  padding: 10px;  
}

.signup input {   
    padding: 10px;
    margin: 10px;
}

.el-tabs {
    max-width: 500px;
    margin: 0 auto;
}
h3 {
    margin: 15px;
}
</style>
