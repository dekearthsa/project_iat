<template>
  <div class="iat-board-container">
    <div class="title-iat-container">
      <div class="title-iat">
        {{runner}}
      </div>
    </div>
    <!-- <div class="time-out">
      {{timingCount}}
    </div> -->
    <div class="content-iat-container" v-if="isFinsh === false">
      <div class="set-content">
        <div class="content-container">
          <div class="set-text">
          {{isWord}}
          </div>
          <div class="set-sub-text">
            {{isSubWord}}
          </div>
        </div>

        <div class="content-container" v-if="isCompareAttrubuteAndTest === true">
          <div class="set-text">
          {{compareIsWord}}
          </div>
          <div class="set-sub-text">
            {{compareIsSubWord}}
          </div>
        </div>
        
      </div>
      
      <!-- <div class="set-pratice">
        <div class="show-content" >
          {{isPratice}}
        </div>
        <div class="show-conten-at">
          {{isPraticeTA}}
        </div>
      </div>

      <div class="set-test" >
        <div class="show-content" >
          {{isTest}}
        </div>
        <div class="show-conten-at">
          {{isTestTA}}
        </div>
      </div> -->
    </div>

    <div class="d-score-content" v-if="showResult === true">
      <div class="title-d-score">
        D-score: {{dScore}}
      </div>
      <div class="target-attibute">
        <div class="test-set">
          <div class="title-pratice">{{iatData.target_pratice_name}}</div>
          <div v-for="(data, index) in targetTest" :key="index">
            {{data}}
          </div>
          <div class="title-test">{{iatData.attribute_test_name}}</div>
          <div v-for="(data, index) in attributeTest" :key="index">
            {{data}}
          </div>
        </div>
        <div class="pratice-set">
          <div class="title-pratice">{{iatData.target_pratice_name}}</div>
          <div v-for="(data, index) in targetPratice" :key="index">
            {{data}}
          </div>
          <div class="title-test">{{iatData.attribute_pratice_name}}</div>
          <div v-for="(data, index) in attributePratice" :key="index">
            {{data}}
          </div>
        </div>
      </div>
    </div>

    <div class="footer-iat-container" v-if="isStart === true && isFinsh === false">
      <div v-if="switchType === false">
        <button class="btn-ok" @click="btnSelection('left',isWord + ' ' + isSubWord, compareIsWord + ' ' + compareIsSubWord)">{{iatData.btn_left}}</button>
        <button class="btn-nope" @click="btnSelection('right',isWord + ' ' + isSubWord, compareIsWord + ' ' + compareIsSubWord)">{{iatData.btn_right}}</button>
      </div>
      <div v-if="switchType === true">
        <button class="btn-ok" @click="btnSelection('right',isWord + ' ' + isSubWord), compareIsWord + ' ' + compareIsSubWord">{{iatData.btn_right}}</button>
        <button class="btn-nope" @click="btnSelection('left',isWord + ' ' + isSubWord), compareIsWord + ' ' + compareIsSubWord">{{iatData.btn_left}}</button>
      </div>
    </div>

    <div class="footer-iat-container-result" v-if="isFinsh === true && showResult === false">
      <button class="btn-nope" @click="btnCalResult">ดูผลลัพท์</button>
    </div>

    <div class="footer-iat-container-result" v-if="showResult === true">
      <button class="btn-nope" @click="haddleRecover">ทำใหม่</button>
    </div>

    <div class="footer-iat-container-start" v-if="isStart === false">
      <button class="btn-nope" @click="btnStart">เริ่มต้น</button>
    </div>

  </div>
</template>

<script>
import axios from 'axios';
import { settingAPI } from '../settingAPI';

const sendAPI = settingAPI();

export default {
  components:{

  },
  data(){
    return{
      runner: "",
      iatData:{},
      targetPratice:[],
      targetTest:[],
      attributePratice:[],
      attributeTest:[],
      timingCount: 10,
      switchType:false,
      isFinsh: false,
      isStart: false,
      indexCount: 0,
      isRound: 10,
      setTime:0,
      dScore:0,
      showResult: false,
      isResult:[],
      isType:"b1",

      isCompareAttrubuteAndTest: false,
      isWord:"",
      isSubWord:"",

      compareIsWord: "",
      compareIsSubWord:""

    }
  },
  methods:{

    async fetchIATData(){
      try{

        const selectionRunner = await axios.get(`${sendAPI}/iatselected`);
        this.runner = selectionRunner.data.runner
        const payload = {
          runner: selectionRunner.data.runner
        }
        
        const selectionIat = await axios.post(`${sendAPI}/useiat`,payload);

        this.iatData = selectionIat.data
        this.targetPratice = selectionIat.data.target_pratice
        this.targetTest = selectionIat.data.target_test
        this.attributePratice = selectionIat.data.attribute_pratice
        this.attributeTest = selectionIat.data.attribute_test

      }catch(err){

      }
    },
    btnSelection(evt, contentLeft, contentRight){
      if(this.isType === "b1"){
        console.log('b1')
        if(this.indexCount >= 10){
          this.isType = "b2"
          this.indexCount = 0;
        }

        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b1",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement =  this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        this.isWord = targetPraticeElement;

        this.setTime = performance.now();
        this.indexCount += 1

        

      }else if(this.isType === "b2"){
        console.log('b2')
        if(this.indexCount >= 10){
          this.isType = "b3"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true
        }

        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b2",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        // const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];
        const attributeTestElement = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];
        this.isWord = attributeTestElement;


        // this.isPratice = attributePraticeElement;
        // this.isTest = attributeTestElement;

        this.setTime = performance.now();
        this.indexCount += 1

      }else if(this.isType === "b3"){
        console.log('b3')
        if(this.indexCount >= 20){
          this.isType = "b4"
          this.indexCount = 0;
          
        }

        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b3",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        this.compareIsWord = this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        this.compareIsSubWord = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b4"){
        console.log('b4')

        if(this.indexCount >= 40){
          this.isType = "b5"
          this.switchType = true
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = false;
        }
        // console.log("D4")
        const timing = performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b4",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        this.compareIsWord = this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        this.compareIsSubWord = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b5"){
        console.log('b5')
        if(this.indexCount >= 10){
          this.isType = "b6"
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = true;
        }

        this.isSubWord = "";
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b5",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement =  this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        this.isWord = targetPraticeElement;
       // const targetTestElement =  this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        

        // this.isPratice = targetPraticeElement;
        // this.isTest = targetTestElement; 

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b6"){
        console.log('b6')
        if(this.indexCount >= 20){
          this.isType = "b7"
          this.indexCount = 0
        }

        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b6",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        this.compareIsWord = this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        this.compareIsSubWord = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement
        

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1
      }else if(this.isType === "b7"){
        console.log('b7')
        const timing =  performance.now();
        const caltiming = timing - this.setTime;

        this.isResult.push({
          typeCal: "b7",
          runnerName: this.runner,
          userSelect: evt,
          contentLeft: contentLeft ? contentLeft: "No-content",
          contentRight: contentRight? contentRight: "No-content",
          milliseconds: caltiming
        });

        const targetPraticeElement = this.targetPratice[Math.floor(Math.random()*this.targetPratice.length)];
        const attributePraticeElement = this.attributePratice[Math.floor(Math.random()*this.attributePratice.length)];

        this.compareIsWord = this.targetTest[Math.floor(Math.random()*this.targetTest.length)];
        this.compareIsSubWord = this.attributeTest[Math.floor(Math.random()*this.attributeTest.length)];

        this.isWord = targetPraticeElement
        this.isSubWord = attributePraticeElement

        this.setTime = performance.now();
        this.indexCount += 1;

        if(this.indexCount >= 40){
          this.isFinsh = true;
          this.indexCount = 0
          this.isCompareAttrubuteAndTest = false;
        }
        
      }
      

    },
    btnStart(){


      this.isStart = true;
      this.btnSelection();

    },
    async btnCalResult(){

      const personalData = localStorage.getItem("user_sign_iat");
      const convertData = JSON.parse(personalData);


      const payload = {
        firstname: convertData.firstname,
        lastname: convertData.lastname,
        phonenum: convertData.phonenum,
        gender: convertData.male ? "M" : "F",
        birthday: convertData.birthday,
        personalities: convertData.personalities,
        iatReply: this.isResult
      }

      try{
        const resultReplyBack  =  await axios.post(`${sendAPI}/analysis`, payload);
        this.dScore =  Math.round(resultReplyBack.data.Dscore * 100) / 100;
        this.showResult = true;
        
      }catch(err){
        console.log(err);
      }

    },
    haddleRecover(){
      this.$router.go()
    }

  },
  computed:{

  },
  mounted(){
    this.fetchIATData();
    // this.btnSelection();
  },
  updated(){
 
    // setTimeout(() => {
    //   if(this.timingCount > 0){
    //      this.timingCount = this.timingCount -1
    //   }
    // },1000);
  }
}
</script>

<style scoped>
.iat-board-container{
  width: 80%;
  margin: auto;
  margin-top: 50px;
}


.time-out{
  margin: auto;
  text-align: center;
  margin-top: 25px;
  font-weight: bold;
  font-size: 20px;
}

.content-iat-container{
  display: flex;
  justify-content: space-around;
  margin: auto;
  text-align: center;
}
  
.title-iat{
  margin: auto;
  text-align: center;
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 60px;
}

.footer-iat-container > div{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.d-score-content{
  margin: auto;
  text-align: center;
  
}

.set-content{
  display:flex;
  justify-content: space-around;
}

.content-container{
  margin-left: 50px;
  margin-right: 50px;
}
.title-d-score{
  font-weight: bold;
  font-size: 20px;
}

.target-attibute{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
  margin-bottom: 30px;
}

.title-test{
  text-align: center;
  font-weight: bold;
}
.title-pratice, .title-test{
  text-align: center;
  font-weight: bold;
  margin-bottom: 10px;
  margin-top: 10px;
  border-bottom: 2px solid grey
}

.footer-iat-container-result , .footer-iat-container-start{
  display: flex;
  justify-content: space-around;
  margin-top: 50px;
}

.btn-ok{
  width: 100px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}

.btn-nope{
  width: 100px;
  height: 40px;
  border-radius: 10px;
  color: white;
  border: 1px solid rgb(129, 125, 125);
  background: rgb(129, 125, 125);
  font-weight: bold;
}
</style>