<template>
  <div class="login-page">
    <div class="login-title">
      <h4>Admin Login</h4>
    </div>
    <div class="login-container">
      <div class="user-login"  v-if="!($cookies.get('IATToken'))">
        <div class="username">
          <input placeholder="username" v-model="username" />
        </div>
        <div class="password">
          <input placeholder="password" type="password" v-model="password"/>
        </div>
      </div>
      <div class="user-now-login" v-if="$cookies.get('IATToken')">
        <h3>You are now login</h3>
      </div>
    </div>
    <div class="error-desc" v-if="errorDesc !== ''">
      <h4>{{errorDesc}}</h4>
    </div>
    <div class="btn-login-container">
      <button class="btn-login" @click="haddleAdminLogin"  v-if="!($cookies.get('IATToken'))">Login</button>
      <button class="btn-login" @click="haddleConfig"  v-if="$cookies.get('IATToken')" >Config</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import {settingAPI} from '../settingAPI'

const sendAPI = settingAPI();

export default {
  components:{
  },
  data(){
    return{
      username: "",
      password: "",
      errorDesc: ""
    }
  },
  methods:{
    
    haddleConfig(){
      this.$router.push("/adminpanel");
    },

    async haddleAdminLogin(){
      if(this.username !== '' && this.password !== ''){
        const payload = {
          username: this.username, 
          password: this.password
        }

        try{
          const loginStatus = await axios.post(`${sendAPI}/login`, payload);
          // console.log(loginStatus)
          if(loginStatus.status === 200){
            this.$cookies.set("IATToken",loginStatus.data.token, '1h' )
            this.$cookies.set("IATAdmin",loginStatus.data.username, '1h' )
            this.$router.push("/adminpanel");
            this.$store.state.pageSelection = "login"
          }else{
            this.errorDesc = "invalid username or password"
          }
        }catch(err){
          this.errorDesc = "invalid username or password"
        }
      }else{
        this.errorDesc = "invalid username or password"
      }
    }
  },
  mounted(){
    // console.log(sendAPI)
  }
}
</script>

<style scoped>
.login-page{
  width: 80%;
  margin: auto;
  text-align: center;
}

.login-container{
  margin-top: 30px;
}
 
input {
  text-indent: 15px;
  width: 250px;
  margin-top: 15px;
  border-radius: 10px;
  border: 1px solid rgb(205, 205, 205);
  height: 40px;
}

.error-desc{
  text-align: center;
  margin: auto;
  color: red;
}
.btn-login{
  color: white;
  width: 100px;
  height: 50px;
  font-weight: bold;
  margin-top: 40px;
  border: 1px solid rgb(55, 198, 245);
  background: rgb(55, 198, 245);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>