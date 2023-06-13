// active function //
require("dotenv").config();
require("./connection/connection").connect();

// import lib //
const express  = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
// const multer  = require('multer');
// const imageToBase64 = require("image-to-base64");


// import middleware // 
const auth = require("./middleware/auth");

// import database model // 
const userAdmin = require('./model/userAdmin');
const IATmodel = require("./model/IATmodel");
const IATAdminSelection = require("./model/IATAdminSelection");
const normalUserSign = require("./model/normalUserSign");
const userDscore = require("./model/userDscore");

// config backend // 
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

const port = process.env.PORT
const hashRound = process.env.saltRounds 

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './image_storage')
//     },
//     filename: (req, file, cb) => {
//         cb(null, 'file-' + Date.now() + '.' +
//         file.originalname.split('.')[file.originalname.split('.').length-1])}
// })

// const upload = multer({ 
//     storage: storage, 
//     limits:{
//         fileSize:3670016
//     }
// })

// app.post("/testimg",upload.single('fileupload'), async (req, res) =>{

// })



app.get('/backend_iat/debug', async (req, res) => {
    res.send("ok")
});


app.post("/backend_iat/register", async (req, res) => {
    const {username, password}  = req.body;
    // console.log("hashRound==>",hashRound)
    const convertRound = parseInt(hashRound)
    try{
        const hashPassword = bcrypt.hashSync(password, convertRound);
        console.log("hashPassword ==>",hashPassword)
        userAdmin.create({
            username: username,
            password: hashPassword
        })
        res.sendStatus(200)
    }catch(err){
        console.log("error api register ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/login", async (req, res) => {
    const {username, password} = req.body; 
    try{
        const isLogin = await userAdmin.findOne({username})
        
        if(isLogin && (await bcrypt.compare(password, isLogin.password))){
            // console.log("login")
            const getToken = jwt.sign(
                {user_id: isLogin._id},
                process.env.TOKEN_KEY,
                {expiresIn: "1h"}
            )
            const payload = {
                username: username,
                token: getToken
            }
            res.send(payload)

        }else{
            // console.log("cannot login")
            res.sendStatus(401)
        }
    }catch(err){
        console.log("error api login ==> ", err);
        res.sendStatus(500)
    }
})

app.post("/backend_iat/creataiat", auth,async (req, res) => {

    const {
        runner, 
        btn_left,
        btn_right,
        attribute_pratice_name,
        attribute_test_name,
        target_pratice_name,
        target_test_name,
        target_pratice, 
        target_test, 
        attribute_pratice,
        attribute_test,
        d1,
        d2,
        d3,
        d4,
        d5,
        d6,
        d7
    } = req.body

    try{

        IATmodel.create({
            runner:runner, 
            btn_left:btn_left,
            btn_right:btn_right,
            attribute_pratice_name:attribute_pratice_name,
            attribute_test_name:attribute_test_name,
            target_pratice_name:target_pratice_name,
            target_test_name:target_test_name,
            target_pratice:target_pratice, 
            target_test:target_test, 
            attribute_pratice:attribute_pratice,
            attribute_test:attribute_test,
            d1:d1,
            d2:d2,
            d3:d3,
            d4:d4,
            d5:d5,
            d6:d6,
            d7:d7
        });

        IATAdminSelection.create({
            runner:runner,
            is_selection: false
        })

        res.sendStatus(200)

    }catch(err){
        console.log("error api creataiat ==> ", err);
        res.sendStatus(500)
    }

});


app.get("/backend_iat/findingiat", auth,async (req, res) => {
    try{
        const listIAT = await  IATmodel.find({});
        res.send(listIAT);
    }catch(err){
        console.log("error api findingiat ==> ", err);
        res.sendStatus(500);
    }
});

app.post("/backend_iat/iatquerydata" , async (req, res) => {
    const {runner} = req.body;
    // console.log(runner)
    try{
        const dataRunner = await IATmodel.findOne({runner:runner});
        res.send(dataRunner)
    }catch(err){
        console.log("error api iatquerydata ==> ", err);
        res.sendStatus(500)
    }
    

})

app.get("/backend_iat/iatselected", async (req, res) => {
    try{
        const fetchRunner = await IATAdminSelection.findOne({is_selection:true});
        // console.log("fetchRunner ==> ",fetchRunner)
        const listIAT = await  IATmodel.findOne({runner:fetchRunner.runner});
        
        res.send(listIAT)
    }catch(err){
        console.log("err in api iatselected: "+ err);
        res.sendStatus(500);
    }
})

app.post("/backend_iat/useiat", async (req, res) => {
    const {runner} = req.body
    try{
        const replyIAT = await IATmodel.findOne({runner});
        res.send(replyIAT);
    }catch(err){
        console.log("err in api useiat: "+ err);
        res.sendStatus(500);
    }
})

app.put("/backend_iat/updateselection", auth, async (req, res) => {
    const {runner, isSelection} = req.body;
    const runnerQuery = {runner:runner};
    try{
        await IATAdminSelection.updateOne(runnerQuery, {is_selection:isSelection});
        await IATAdminSelection.updateMany({
            runner:{
                $ne:runner
            }
        },
        {
            $set:{
                is_selection:false
            }
        },
        )
        res.sendStatus(200)
    }catch(err){
        console.log("err in api updateselection: "+ err);
        res.sendStatus(500)
    }
})


app.post("/backend_iat/usersign", async (req, res) => {

    const {
        firstname, 
        lastname, 
        phonenum, 
        male, 
        birthday,
        selectPersonal } = req.body

    let gender = male? "M" : "F"

    try{
        await normalUserSign.create({
            firstname: firstname,
            lastname: lastname,
            phone_num: phonenum,
            sex: gender,
            birthday: birthday,
            personalities: selectPersonal
        });
        res.sendStatus(200)
    }catch(err){
        console.log("err in api usersign: "+ err);
        res.sendStatus(500)
    }
});


app.post("/backend_iat/analysis", async (req, res) => {
    
    const {
        firstname,
        lastname,
        phonenum,
        gender,
        birthday,
        personalities,
        iatReply
    } = req.body

    const avgCalculate = require("./calculateFunction/avgCalculate")
    const calculateD = require("./calculateFunction/calculateD")

    let arrayOfMillisecondsD3 = [];
    let arrayOfMillisecondsD4 = [];
    let arrayOfMillisecondsD6 = [];
    let arrayOfMillisecondsD7 = [];

    try{
        // console.log(iatReply);

        iatReply.forEach((element) => {

            if(element.typeCal === "b3"){
                if(element.milliseconds >= 1000){
                    arrayOfMillisecondsD3.push(0);
                }else{
                    arrayOfMillisecondsD3.push(element.milliseconds);
                }
                
            }else if(element.typeCal === "b4"){
                if(element.milliseconds >= 1000){
                    arrayOfMillisecondsD4.push(0);
                }else{
                    arrayOfMillisecondsD4.push(element.milliseconds);
                }
            }else if(element.typeCal === "b6"){
                if(element.milliseconds >= 1000){
                    arrayOfMillisecondsD6.push(0);
                }else{
                    arrayOfMillisecondsD6.push(element.milliseconds);
                }
            }else if(element.typeCal === "b7"){
                // console.log("D7 ==> ",element.milliseconds)
                if(element.milliseconds >= 1000){
                    arrayOfMillisecondsD7.push(0);
                }else{
                    arrayOfMillisecondsD7.push(element.milliseconds);
                }
            }

        });
        
        // console.log(arrayOfMillisecondsD3.length, arrayOfMillisecondsD4.length, arrayOfMillisecondsD6.length, arrayOfMillisecondsD7.length)
        const subResultD3 = avgCalculate(arrayOfMillisecondsD3);
        const subResultD4 = avgCalculate(arrayOfMillisecondsD4);
        const subResultD6 = avgCalculate(arrayOfMillisecondsD6);
        const subResultD7 = avgCalculate(arrayOfMillisecondsD7);
        // const subResultD8 = avgCalculate(arrayOfMillisecondsD3);
        // console.log(subResultD7)
        
        const dPratice = calculateD(subResultD3.sumOf, subResultD4.sumOf, subResultD3.standardDeviation, subResultD4.standardDeviation)
        const dTest = calculateD(subResultD6.sumOf, subResultD7.sumOf, subResultD6.standardDeviation, subResultD7.standardDeviation)
        const Dscore = (dPratice + dTest ) / 2;
        const sendD = {
            Dscore: Dscore
        }

        try{


            await userDscore.create({
                firstname:firstname,
                lastname:lastname,
                phonenum:phonenum,
                gender:gender,
                birthday:birthday,
                personalities:personalities,
                dscore:Dscore,
                result:iatReply
            });
            
            // const replyRsult = {
            //     result: sendD
            // }
            res.send(sendD)

        }catch(err){
            console.log("err in api analysis: "+ err);
            res.sendStatus(500)
        }

        // console.log(Dscore)
        // res.send(sendD)
    }catch(err){
        console.log("err in api analysis: "+ err);
        res.sendStatus(500)
    }

});


app.listen(port, () => {
    console.log(`app running on port: ${port} ==> http://localhost:${port}`)
})