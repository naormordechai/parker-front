
<template>
    <section>
        
        <el-tabs type="border-card">
            <el-tab-pane label="Login">
                <div class="login">                   
                    <h3>Login to your account</h3>
                    <form @submit.prevent="login">
                        <div class="login-container flex column">
                            <input type="text" v-model="userInfo.email" placeholder="Insert your email"/>   
                            <input type="password" v-model="userInfo.password" placeholder="password"/>                
                            <el-button type="success" @click="login">Login</el-button>
                            <!-- <input type="submit"> -->
                        </div>
                    </form>
                 </div>
            </el-tab-pane>

            <el-tab-pane label="Signup">
                <div class="signup">
                    <h3>Create a new account</h3>
                    <form @submit.prevent="signup">
                        <div class="signup-container flex column">
                            <input type="text" v-model="newUser.firstName" placeholder="First Name:"/>   
                            <input type="text" v-model="newUser.lastName" placeholder="Last Name:"/>   
                            <input type="email" v-model="newUser.email" placeholder="email:"/>   
                            <input type="password" v-model="newUser.password" placeholder="Password:"/>                
                            <el-button type="success" @click="signup">Sign me Up!</el-button>
                            <!-- <input type="submit"> -->
                        </div>
                    </form>
                    <p>{{message}}</p>
                 </div>
            </el-tab-pane>        
        </el-tabs>
    <FooterCmp />
    </section>
</template>

<script>

import UserService from '../../services/UserService.js'
import eventBus from '../../services/EventBusService.js'
import FooterCmp from '@/components/FooterCmp.vue'


export default {
  data() {
    return {
      message: "",
      userInfo: {
        email: "",
        password: ""
      },
      newUser: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      }
    };
  },

  methods: {
    login() {
      if (!this.userInfo.email || !this.userInfo.password) {
        this.alert("The user or Password is empty! Please insert and try again");
      } else
        this.$store
          .dispatch({ type: "login", userInfo: this.userInfo })
          .then(_ => {
            this.$router.go(-1);
          })
          .catch(err => {
              // this.message = "no such user"
            this.alert("The User or Password is wrong! please try again") 
          });
    },
    signup() {
      console.log("user signed up");
      if (
        !this.newUser.firstName ||
        !this.newUser.lastName ||
        !this.newUser.email ||
        !this.newUser.password
      ) {
        this.message = "Please insert all details";
        return;
      }
      this.$store
        .dispatch({ type: "signup", newUser: this.newUser })
        .then(_ => {
          this.$router.push("/parking");
        })
        .catch(err => {
          console.log("error creating new user: ", err);
        });
    },
    alert(message) {
      this.$alert(message, "Alert", {
        confirmButtonText: "OK",
      });
 
      
    }
  },
  components:{
    FooterCmp
  }
};
</script>

<style scoped>


section {
  margin-top: 60px;
}

.login-container,
.signup-container {
  max-width: 50%;
  margin: 0 auto;
}
.login-container input,
.signup-container input {
  margin-bottom: 10px;
}

.login input,
button {
  padding: 10px;
}

.signup input {
  padding: 10px;
  margin: 10px;
}

.signup-container .el-button {
  margin: 0 10px;
}

.el-tabs {
  max-width: 500px;
  margin: 0 auto;
}
h3 {
  margin: 15px;
}

@media (max-width: 550px) {
  .el-tabs {
    max-width: 400px;
    margin: 0 auto;
  }
}

@media (max-width: 440px) {
  .el-tabs {
    max-width: 300px;
  }
  .signup-container,
  .login-container {
    max-width: 100%;
  }

  .el-message-box{
    width:20px;
  }

}
</style>
