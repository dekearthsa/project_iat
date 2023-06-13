<template>
    <div class="admin-panel">
        <div class="set-admin-panel">
            <div class="title-page">

                <div>Config IAT</div>
                <div class="icon-border" @click="haddleHome">
                    <i class='fas fa-home' style='font-size:24px; color:white'></i>
                </div>
                
            </div>
            <div class="iat-selection-container">
                You are select IAT: {{selectedRunner.runner}}
            </div>
            <div class="selection-iat">
                <label for="is-iat">Choose IAT:</label>
                <select class="from-select-iat" id="is-iat" name="is-iat" v-model="selectionIAT" >
                    <!-- this option need to loop data using v-for -->
                    <option :value="data" v-for="(data, index) in onHandIAT" :key="index">{{data.runner}}</option>
                </select>
            </div>
            <div class="iat-content">
                <div class="title-iat">
                    <h4>Target</h4>
                </div>
                <div class="test-pratice">
                        <div class="is-pratice">
                            <div class="title-iat">
                                <h6>{{selectedRunner.target_pratice_name}}</h6>
                            </div>
                            <div class="list-data" v-for="(data, index) in selectionIAT.target_pratice" :key="index">
                                <div>{{index}}: {{data}}</div>
                            </div>
                        </div>
                        <div class="is-test">
                            <div class="title-iat">
                                <h6>{{selectedRunner.target_test_name}}</h6>
                            </div>
                            <div class="list-data" v-for="(data, index) in selectionIAT.target_test" :key="index">
                                <div>{{index}}: {{data}}</div>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="iat-content">
                <div class="title-iat">
                    <h4>Attribute</h4>
                </div>
                <div class="test-pratice">
                        <div class="is-pratice">
                            <div class="title-iat">
                                <h6>{{selectedRunner.attribute_pratice_name}}</h6>
                            </div>
                            <div class="list-data" v-for="(data, index) in selectionIAT.attribute_pratice" :key="index">
                                <div>{{index}}: {{data}}</div>
                            </div>
                        </div>
                        <div class="is-test">
                            <div class="title-iat">
                                <h6>{{selectedRunner.attribute_test_name}}</h6>
                            </div>
                             <div class="list-data" v-for="(data, index) in selectionIAT.attribute_test" :key="index">
                                <div>{{index}}: {{data}}</div>
                            </div>
                        </div>
                    </div>
            </div>

            <div class="iat-content">
                <div class="title-iat">
                    <h4>Calulate methods</h4>
                </div>
                <div class="cal-methods-active">
                    <div v-if="selectionIAT.d1 === true">D1</div>
                    <div v-if="selectionIAT.d2 === true">D2</div>
                    <div v-if="selectionIAT.d3 === true">D3</div>
                    <div v-if="selectionIAT.d4 === true">D4</div>
                    <div v-if="selectionIAT.d5 === true">D5</div>
                    <div v-if="selectionIAT.d6 === true">D6</div>
                    <div v-if="selectionIAT.d7 === true">D7</div>
                </div>
            </div>

            <div class="iat-content">
                <div class="title-iat">
                    <h4>Button Content</h4>
                </div>
                <div class="set-btn-text">
                    <div>
                        <div class="conf-title">Left side</div>
                        <button class="btn-config">{{selectedRunner.btn_left}}</button>
                    </div>
                    <div>
                        <div class="conf-title">Right side</div>
                        <button class="btn-config">{{selectedRunner.btn_right}}</button>
                    </div>
                    
                    
                </div>
            </div>

            <div class="btn-panel-iat">
                <div class="set-btn-save">
                    
                    <button class="btn-save" @click="haddleSaveIAT">Use this IAT</button>
                </div>
                <div class="set-btn-add">
                    
                    <button class="btn-add" @click="haddleCreateIAT">Create new IAT</button>
                </div>
            </div>
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
            onHandIAT:[],
            selectionIAT:"",
            isIATInfo:"None",
            btnLeft:"n/a",
            btnRight:"n/a",
            selectedRunner:"No IAT have select, try to create another IAT or select IAT in dropdown."
        }
    },
    methods:{
        haddleHome(){
            this.$router.push("/")
        },
        haddleCreateIAT(){
            this.$router.push("/configiat");
            this.$store.state.pageSelection = "adminpanel"
        },
        async haddleSaveIAT(){

            const headerConf = {
                headers:{
                'Content-Type': 'application/json',
                'access-token':  this.$cookies.get("IATToken")
                }
            }

            const payload = {
                runner: this.selectionIAT.runner, 
                isSelection: true,
            }

            try{
                await axios.put(`${sendAPI}/updateselection`,payload,headerConf);
                alert(`you are now use iat ${this.selectionIAT.runner}`);
                // console.log(returnStatus);
            }catch(err){
                // console.log("err put ==> ",err)
            }
        },
        async queryAllIAT(){
            const headerConf = {
                headers:{
                'Content-Type': 'application/json',
                'access-token':  this.$cookies.get("IATToken")
                }
            }
            

            try{
                const IATdata =  await axios.get(`${sendAPI}/findingiat`,headerConf);
 
                this.onHandIAT = IATdata.data;
            
            }catch(err){
                console.log("get data ==> ",err)
                this.$cookies.remove("IATToken")
                this.$cookies.remove("IATAdmin")
                this.$router.push("/login");
            }
        },
        async querySelectedIAT(){
            // console.log(this.selectionIAT)
            const headerConf = {
                headers:{
                'Content-Type': 'application/json',
                'access-token':  this.$cookies.get("IATToken")
                }
            }

            const payload = {
                runner: this.selectionIAT.runner
            }

            console.log("querySelectedIAT ==> ", payload)

            try{
                const selectedIAT = await axios.get(`${sendAPI}/iatselected`,headerConf);
                const showInfoIAT = await axios.post(`${sendAPI}/iatquerydata`,payload,headerConf);
                this.isIATInfo = showInfoIAT.data;
                // console.log(this.isIATInfo)
                this.selectedRunner =  selectedIAT.data
                this.btnLeft = selectedIAT.data.btn_left
                this.btnRight = selectedIAT.data.btn_right

                // this.selectionIAT = selectedIAT.data
            }catch(err){
                this.$cookies.remove("IATToken")
                this.$cookies.remove("IATAdmin")
                this.$router.push("/login");
            }
            
            
        }
    },
    mounted(){
        this.queryAllIAT();
        
    },
    updated(){
        this.querySelectedIAT();
    }
}
</script>

<style scoped>
.admin-panel{
    width: 80%;
    margin: auto;
}


.title-page{
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
}

.title-page > div {
    font-weight: bold;
    font-size: 20px;
    margin-top: 15px;
    
}

.iat-selection-container{
    text-align: center;
    margin-bottom: 50px;
    font-weight: bold;
    font-size: 17px
}

.conf-title{
    text-align: center;
    margin-bottom: 5px;
}

.set-btn-text{
    display:flex;
    justify-content: space-around;
    margin-bottom: 20px;
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

.icon-border{
    background: rgb(62, 62, 62);
    padding: 10px;
    border-radius: 10px;
}
.set-admin-panel{
    margin-top: 30px;
}

.from-select-iat{
    width: 50%;
    margin-left: 10px;
    height: 30px;
}

.iat-content{
    margin-top: 20px;
    border: 1px solid gray;
    border-radius: 10px;
}

.title-iat{
    text-align: center;
}

.test-pratice{
    display:flex;
    justify-content: space-around;
}

.btn-panel-iat{
    margin-top: 20px;
    text-align: center;
}

.btn-panel-iat > div{
    margin-top: 10px;
}

.test-pratice{
    margin-bottom: 20px;
}
.cal-methods-active{
    display: grid;
    grid-template-columns: 1fr 1fr;
    text-align: center;
    margin-bottom: 20px;
}

.btn-save{
    width: 70%;
    height: 40px;
    border: 1px solid rgb(10, 125, 255);
    background: rgb(10, 125, 255);
    border-radius: 10px;
    color: white;
    font-weight: bold;
}

.btn-add{
    width: 70%;
    height: 40px;
    border: 1px solid rgb(226, 94, 0);
    background: rgb(226, 94, 0);
    border-radius: 10px;
    color: white;
    font-weight: bold;
    margin-bottom: 30px;
}
</style>