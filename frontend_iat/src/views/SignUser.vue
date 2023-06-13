<template>
    <div>
        <div class="user-detail-container" v-if="isError === ''">
        <div class="set-user-detail">
            <div class="title">
                <div>Register</div>
                <div class="back-to-home" @click="haddleHomePage"><i class='fas fa-angle-double-right' style='font-size:24px'></i></div>
            </div>
        </div>
        <div class="user-form-register-container">
            <div class="form-container">
                <div class="set-form">
                    <input placeholder="ชื่อ" v-model="firstname" />
                </div>
                <div class="set-form">
                    <input placeholder="นามสกุล" v-model="lastname"/>
                </div>
                <div class="set-form">
                    <input type="text" placeholder="เบอร์โทรศัพท์" v-model="phoneNum"/>
                </div>
                <div class="set-form-sex">
                    <div class="set-male">
                        <label>ชาย</label>
                        <input type="radio" name="sex-select" v-model="male"/>
                    </div>
                    <div class="set-female">
                        <label>หญิง</label>
                        <input type="radio" name="sex-select" v-model="female"/>
                    </div>
                </div>
                <div class="set-form-birth">
                    <div class="birthday-content">
                        วันเดือนปีเกิด
                    </div>
                    <input type="date"  v-model="dateNow"/>
                </div>
                <div class="set-form">
                    <div class="personalities-container">
                        กรุณาเลือกบุคลิกภาพของตนเอง
                    </div>
                    <select class="personalities-type" id="personalities" name="personalities" v-model="selectPersonal">
                        <option :value="data" v-for="(data, index) in personalitiesArray" :key="index">{{data}}</option>
                    </select>
                    <a href="https://www.16personalities.com/th/%E0%B9%81%E0%B8%9A%E0%B8%9A%E0%B8%97%E0%B8%94%E0%B8%AA%E0%B8%AD%E0%B8%9A%E0%B8%9A%E0%B8%B8%E0%B8%84%E0%B8%84%E0%B8%A5%E0%B8%B4%E0%B8%81%E0%B8%A0%E0%B8%B2%E0%B8%9E">แบบทดสอบบุคลิกภาพ</a>
                </div>
            </div>
        </div>
        <div class="btn-sign"> 
            <button class="btn-save" @click="haddleSave">Save</button>
        </div>
    </div>
    <div class="is-error" v-if="isError !== ''">
        {{isError}}
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
            dateNow: "",
            personalitiesArray:[
                "Unknow",
                "INTJ",
                "INTP",
                "ENTJ",
                "ENTP",
                "INFJ",
                "INFP",
                "ENFJ",
                "ENFP",
                "ISTJ",
                "ISFJ",
                "ESTJ",
                "ESFJ",
                "ISTP",
                "ISFP",
                "ESTP",
                "ESFP",
            ],
            firstname:"",
            lastname:"",
            phoneNum:"",
            male:false,
            female:false,
            selectPersonal:"Unknow",
            isError:""
        }
    },
    methods:{
        findDate(){
            const  isDate = new Date();
            const setDate =  isDate.toISOString().split('T')[0]
            this.dateNow = setDate
        },
        haddleHomePage(){
            this.$router.push("/")  
        },
        async haddleSave(){

            if(this.firstname !== '' && this.lastname !== '' && this.phoneNum !== '' ){

                const payload = {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    phonenum: this.phoneNum,
                    male: this.male,
                    birthday: this.dateNow,
                    selectPersonal: this.selectPersonal
                }

                const setToLocalStorage = JSON.stringify(payload)

                localStorage.setItem("user_sign_iat", setToLocalStorage)
                try{
                    await axios.post(`${sendAPI}/usersign`,payload);
                    alert("user register complete");
                    const settingName = this.firstname + this.lastname
                    localStorage.setItem("iatNameSet", settingName);
                    this.$store.state.userData = payload;
                    this.$router.push("/iatboard");
                }catch(err){
                    this.isError = `internal error ${err}`
                }

            }else{
                this.isError = `Firstname, Lastname, Phone number, Gender, Birthday must not be empty.`
            }
            
        }
    },
    mounted(){
        this.findDate()
    }
    
}
</script>

<style scoped>

.is-error{
    width: 80%;
    margin: auto;
    text-align: center;
    margin-top: 30%;
    color:rgb(151, 23, 23);
}
.user-detail-container{
    width: 80%;
    margin: auto;
}

.set-user-detail{
    margin-top: 50px;
}

.title{
    display:flex;
    justify-content: center;
    text-align: center;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 50px;
}

.back-to-home{
    transform: translateX(95px);
    color: gray;
}

.set-form > input {
    width: 80%;
    height: 35px;
    margin-top: 20px;
    border-radius: 10px;
    border: 1px solid gray;
    font-size: 16px;
    text-indent: 10px;
}

.set-form-sex{
    display:flex;
    justify-content: center;
    margin-top: 20px;
}

.set-male{
    margin-right: 10px;
}

.set-female{
    margin-left: 10px;
}

.set-form-birth{
    display: flex;
    justify-content: center;
    margin-top: 30px;
}


.set-form-birth > input{
    margin-left: 10px;
    height: 30px;
    width: 150px;
    text-indent: 10px;
    border-radius: 5px;
    border: 1px solid gray
}
.form-container{
    margin: auto;
    text-align: center;
}

.user-form-register-container{
    border: 1px solid gray;
    border-radius: 10px;
    margin-bottom: 30px;
}

.birthday-content{
    margin-top: 5px;
}

.personalities-type{
    margin-top: 30px;
    margin-bottom: 30px;
    width: 100px;
    height: 30px;
    margin-right: 10px;
    text-indent: 10px;
    border-radius: 5px;
}

.personalities-container{
    margin-top: 30px;
}

a{
    text-decoration: none;
}

a:hover{
    color: black;
    font-weight: bold;
}

a:active{
    color: black;
    font-weight: bold;
}

.btn-sign{
    margin:auto;
    text-align: center;
}

.btn-save{
    width: 150px;
    height: 45px;
    border: 1px solid rgb(0, 154, 230);
    border-radius: 10px;
    background: rgb(0, 154, 230);
    font-weight: bold;
    font-size: 17px;
    color: white;
}
</style>