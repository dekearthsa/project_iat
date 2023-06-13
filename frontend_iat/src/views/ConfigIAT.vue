<template>
  <div class="config-iat-container">
    <div class="title-page">
      <div class="back-btn" @click="haddleAdminPanel"><i class='fas fa-angle-double-left' style='font-size:24px;'></i></div>
      <div class="title-iat">New Config IAT</div>
    </div>
    <div class="set-config">
      
      <div class="set-runner">
        <div class="title-runner">
          Runner
        </div>
        <input class="runner-input" v-model="runner"/>
      </div>

      <div class="set-btn-change"> 
        <div class="btn-change">
          <div><input class="input-change" v-model="btn_left"/></div>
          <button class="btn-config">{{btn_left}}</button>
        </div>
        <div>
          <div><input class="input-change"  v-model="btn_right"/></div>
          <button class="btn-config">{{btn_right}}</button>
        </div>
      </div>

      <div class= "set-category">
        <div class="target-category"> 
          <div class="title">
            <h4>Target Category</h4>
            <p>Adding your target category.</p>
            <div class="input-content-left-right">
              <div class="left-side">
                <div class="set-title-left-right">
                  <div>{{tarTittleLeft}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-p')">+</button></div> -->
                </div>
                
                <input placeholder="name attribute left" v-model="tarTittleLeft"/>
              </div>
              <div class="right-side">
                <div class="set-title-left-right">
                  <div>{{tarTittleRight}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-t')">+</button></div> -->
                </div>
                <input placeholder="name attribute right" v-model="tarTittleRight"/>
              </div>
            </div>
          </div>

          <div class="show-input"> 
            <div class="input-text">
              <p v-if="targetLeft.length < 0 || targetRight.length < 0">No target category adding</p>
              <div class="setting-list" v-if="targetLeft.length > 0 || targetRight.length > 0">
                <div v-if="targetLeft.length > 0"> 
                  <div v-for="(data, index) in targetLeft" :key="index" >
                    {{index}}: {{data}}
                  </div>
                  </div>
                <div v-if="targetRight.length > 0">
                  <div v-for="(data, index) in targetRight" :key="index">
                    {{index}}: {{data}}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="left-size">
            <div class="pratice-category">
              {{tarTittleLeft}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-model="targetPratice"/>
              <button  class="btn-haddle" @click="haddleAddingTargetPratice">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveTargetPratice">-</button>
            </div>
          </div>

          <div class="right-size">
            <div class="pratice-category">
              {{tarTittleRight}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-model="targetTest"/>
              <button  class="btn-haddle" @click="haddleAddingTargetTest">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveTargetTest">-</button>
            </div>
          </div>
          <!-- <div class="set-btn">
              <button  class="btn-haddle">+</button>
              <button  class="btn-haddle-mius">-</button>
          </div> -->
        </div>

        <div class="attribute-category">
          
          <div class="title">
            <h4>Attribute</h4>
            <p >Adding your attribute.</p>
            <div class="input-content-left-right">
              <div class="left-side">
                <div class="set-title-left-right">
                  <div>{{attTitleLeft}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-p')">+</button></div> -->
                </div>
                
                <input placeholder="name attribute left" v-model="attTitleLeft"/>
              </div>
              <div class="right-side">
                <div class="set-title-left-right">
                  <div>{{attTitleRight}}</div>
                  <!-- <div><button  class="btn-haddle-t" @click="haddleChangeTitle('att-t')">+</button></div> -->
                </div>
                <input placeholder="name attribute right" v-model="attTitleRight"/>
              </div>
            </div>
          </div>

          <div class="show-input"> 
            <div class="input-text">
              <p v-if="attributeLeft.length < 0 || attributeRight.length < 0">No attribute adding.</p>
              <div class="setting-list" v-if="attributeLeft.length > 0 || attributeRight.length > 0">
              <div v-if="attributeLeft.length > 0">
                <div v-for="(data, index) in attributeLeft" :key="index">
                    {{index}} {{data}}
                </div>
              </div>
              <div v-if="attributeRight.length > 0">
                <div v-for="(data, index) in attributeRight" :key="index">
                    {{index}} {{data}}
                </div>
              </div>
              </div>
            </div>
          </div>
          <div class="left-size">
            <div class="pratice-category">
              {{attTitleLeft}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-model="attributePratice"/>
              <button  class="btn-haddle" @click="haddleAddingAttributePratice">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveAttributePratice">-</button>
            </div>
          </div>

          <div class="right-size">
            <div class="pratice-category">
              {{attTitleRight}}
            </div>
            <div class="btn-add-remove">
              <input class="target-input" v-model="attributeTest"/>
              <button  class="btn-haddle" @click="haddleAddingAttributeTest">+</button>
              <button  class="btn-haddle-mius" @click="haddleRemoveAttributeTest">-</button>
            </div>
          </div>


        </div>
      </div>

      <div class="calculation-methods">
        <div class="title-calculation">
          Calculation methods
        </div>

        <div class="warp-check-ing-cal">
          <div class="check-ing-cal">
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d1" />
              <label class="set-label">D1</label>
            </div>
            <div>
              <input class="set-checkbox" type="checkbox"  v-model="d2"/>
              <label class="set-label">D2</label>
            </div>
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d3" />
              <label class="set-label">D3</label>
            </div>
          </div>

          <div class="check-ing-cal">
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d4"/>
              <label class="set-label">D4</label>
             </div>
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d5"/>
              <label class="set-label">D5</label>
            </div>
              <div>
              <input class="set-checkbox" type="checkbox"  v-model="d6"/>
              <label class="set-label">D6</label>
            </div>
          </div>

          <div class="check-ing-cal">
            <div>
              <input class="set-checkbox" type="checkbox" v-model="d7"/>
              <label class="set-label">D7</label>
             </div>
             <div class="set-default-cal">
                <button @click="haddleDefault">default</button>
             </div>
          </div>

        </div>
        
      </div>

      <div class="set-save-btn">
        <button class="save-btn" @click="haddleSaveIAT">save</button>
      </div>

    </div>
    <div class="footer-container">
      
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { settingAPI } from '../settingAPI'

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner:"",
      btn_left:"ข้อความปุ่มซ้าย",
      btn_right: "ข้อความปุ่มขวา",
      tarTittleLeft: "left side",
      tarTittleRight:"right side",
      attTitleLeft:"left side",
      attTitleRight:"right side",
      targetPratice:"",
      targetTest:"",
      attributePratice:"",
      attributeTest:"",
      targetLeft:[],
      targetRight:[],
      attributeLeft:[],
      attributeRight:[],
      d1:false,
      d2:false,
      d3:true,
      d4:true,
      d5:false,
      d6:true,
      d7:true,
      isError:""
    }
  },
  methods:{
    haddleAdminPanel(){
      this.$router.push("/adminpanel")
    },
    haddleAddingTargetPratice(){
      this.targetLeft.push(this.targetPratice)
      this.targetPratice = ""
    },
    haddleRemoveTargetPratice(){
      this.targetLeft.pop()
    },
    haddleAddingTargetTest(){
      this.targetRight.push(this.targetTest)
      this.targetTest= ""
    },
    haddleRemoveTargetTest(){
      this.targetRight.pop()
    },
    haddleAddingAttributePratice(){
      this.attributeLeft.push(this.attributePratice)
      this.attributePratice =""
    },
    haddleRemoveAttributePratice(){
      this.attributeLeft.pop()
    },
    haddleAddingAttributeTest(){
      this.attributeRight.push(this.attributeTest)
      this.attributeTest = ""
    },
    haddleRemoveAttributeTest(){
      this.attributeRight.pop()
    },
    haddleDefault(){
      this.d1  = false;
      this.d2  = false;
      this.d3  = true;
      this.d4  = true;
      this.d5  = false;
      this.d6  = true;
      this.d7  = true;
    },
    async haddleSaveIAT(){

      const payload = {
        runner: this.runner,  
        btn_left: this.btn_left,
        btn_right: this.btn_right,
        attribute_pratice_name: this.attTitleLeft,
        attribute_test_name:this.attTitleRight,
        target_pratice_name:this.tarTittleLeft,
        target_test_name:this.tarTittleRight,
        target_pratice: this.targetLeft, 
        target_test: this.targetRight,  
        attribute_pratice: this.attributeLeft,
        attribute_test: this.attributeRight,
        d1:this.d1 ,
        d2:this.d2,
        d3:this.d3,
        d4:this.d4,
        d5:this.d5,
        d6:this.d6,
        d7:this.d7
      }

      const headerConf = {
        headers:{
          'Content-Type': 'application/json',
          'access-token':  this.$cookies.get("IATToken")
        }
      }

      try{
        const createStatus = await axios.post(`${sendAPI}/creataiat`,payload,headerConf);
        if(createStatus.status === 200){
          alert("IAT create success.")
          this.runner = ""
          this.targetLeft = []
          this.targetRight = []
          this.attributeLeft = []
          this.attributeRight = []
          this.d1 = false
          this.d2 = false
          this.d3 = true
          this.d4 = true
          this.d5 = false
          this.d6 = true
          this.d7 = true
        }else{
          alert("connection timeout.")
          this.runner = ""
          this.targetLeft = []
          this.targetRight = []
          this.attributeLeft = []
          this.attributeRight = []
          this.d1 = false
          this.d2 = false
          this.d3 = true
          this.d4 = true
          this.d5 = false
          this.d6 = true
          this.d7 = true
          this.$cookies.remove("IATToken")
          this.$cookies.remove("IATAdmin")
          this.$router.push("/login")
        }
      }catch(err){
        alert("connection timeout.")
        this.runner = ""
        this.targetLeft = []
        this.targetRight = []
        this.attributeLeft = []
        this.attributeRight = []
        this.d1 = false
        this.d2 = false
        this.d3 = true
        this.d4 = true
        this.d5 = false
        this.d6 = true
        this.d7 = true
        this.$cookies.remove("IATToken")
        this.$cookies.remove("IATAdmin")
        this.$router.push("/login")
      }
    },
    haddleChangeTitle(evt){
      if(evt === "tar-p"){
        this.tarTittleLeft = this.tarTittleLeft
      }else if(evt === "tar-t"){
        this.tarTittleRight = this.tarTittleRight
      }else if(evt === "att-p"){
        this.attTitleLeft = this.attTitleLeft
      }else if(evt === "att-t"){
        this.attTitleRight = this.attTitleRight
      }
    }
  }
}
</script>

<style scoped>

.title-page{
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.title-iat{
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}


.set-btn-change{
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
  margin-top: 30px;
}

.btn-config{
  width: 120px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.input-change{
  margin-bottom: 10px;
  width: 120px;
  height: 25px;
  border-radius: 5px;
  border: 1px solid gray
}
.input-content-left-right{
  display: flex;
  justify-content: space-around;
  margin-bottom: 20px;
}

.left-side > input{
  width: 120px;
  height: 20px;
}

.right-side > input{
  width: 120px;
  height: 20px;
}

.set-title-left-right{
  display:flex;
  
}
.config-iat-container{
  width: 80%;
  margin: auto;
  text-align: center;
}

.back-btn{
  transform: translateX(-90px);
}

.set-config{
  margin-top: 30px;
}

.set-runner{
  display: flex;
  justify-content: center;
}

.title-runner{
  font-size: 15px;
  margin-top: 5px;
  padding-right: 10px;
}

.target-category, .attribute-category{
  margin-top: 50px;
  border: 1px solid grey;
  border-radius: 10px;
  padding-top: 10px;
  padding-bottom: 20px;
  padding-left: 10px;
  padding-right: 10px;
  
}
.runner-input{
  height: 25px;
  width: 250px;
}
.set-category{
  margin-top: 50px;
}

.target-input , .attribute-input{
  height: 25px;
  width: 150px;
}

.input-text{
  color: gray;
}

.title-calculation{
  margin-top: 50px;
  font-weight: bold;
  margin-bottom: 30px;
}
.show-input{
  border: 1px solid gray;
  border-radius: 10px;
  margin-bottom: 10px;
  font-size: 12px;
}

.btn-haddle{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(90, 203, 241);
  background: rgb(90, 203, 241);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.btn-haddle-t{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(39, 141, 42);
  background: rgb(39, 141, 42);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.btn-haddle-mius{
  color: white;
  width: 20px;
  height: 20px;
  border: 1px solid rgb(255, 117, 117);
  background: rgb(255, 117, 117);
  border-radius: 50%;
  font-weight: bold;
  margin-left: 10px;
}

.left-size, .right-size{
  display: grid;
  grid-template-columns:  1fr 3fr;
  margin-top: 5px;
}

.setting-list{
  display: grid;
  grid-template-columns: 1fr 1fr;
}
.set-btn{
  margin-top: 10px;
}

.pratice-category{
  text-align: left;
}
.warp-check-ing-cal{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
.footer-container{
  margin-top: 50px;
}
.set-checkbox{
  width: 25px;
  height: 25px;
}

.set-save-btn{
  margin-top: 20px;
}

.save-btn{
  border: 1px solid rgb(60, 190, 255);
  background: rgb(60, 190, 255);
  color: white;
  width: 150px;
  height: 30px;
  min-width: 40px;
  font-weight: bold;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}

.save-btn:active{
  box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
}

 
.set-default-cal > button{
  margin-top: 15px;
  color: white;
  border: 1px solid gray;
  background: grey;
  height: 30px;
  border-radius: 10px;
  font-weight: bold;
}

</style>