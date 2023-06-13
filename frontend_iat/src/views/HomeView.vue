<template>
  <div class="set-homepage-container">
    <div class="title-iat"> 
      <h4>testing</h4>
    </div>
    <div class="user-selection">
      <div class="user-container">
        <button class="btn-on-click-user" @click="haddleSelection('user')">
          <h4>Normal user</h4>
        </button>
      </div>
      <div class="user-container">
        <button class="btn-on-click-admin"  @click="haddleSelection('admin')">
          <h4>Admin</h4>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components:{

  },
  data(){
    return{

    }
  },
  methods:{
    haddleSelection(e){
      if(e === 'admin'){
        this.$router.push('/login');
      }else{
        this.$router.push('/sign');
      }
    }
  },
  mounted(){

  }

}
</script>

<style scoped>
.set-homepage-container{
  width: 90%;
  margin: auto;
  border: 1px solid grey;
  border-radius: 30px;
  margin-top: 30px;
  padding-bottom: 20vh;
}

.title-iat{
  text-align: center;
}

.user-selection{
  display:flex;
  justify-content:center;
  margin-top: 40%;
}

.user-container > button{
  margin-left: 20px;
  margin-right: 20px;
}

.btn-on-click-user{
  width: 150px;
  border: 1px solid rgb(55, 198, 245);
  background: rgb(55, 198, 245);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  color:white;
}
.btn-on-click-admin{
  width: 150px;
  border: 1px solid rgb(225, 82, 82);
  background: rgb(225, 82, 82);
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  color:white;
}
</style>