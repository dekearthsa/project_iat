const mongoose = require("mongoose"); 

const userDscore = new mongoose.Schema({
    firstname: {type:String},
    lastname: {type:String},
    phonenum: {type:String},
    gender: {type:String},
    birthday: {type:String},
    personalities: {type:String},
    dscore: {type:Number},
    result: [
        {
            typeCal: {type:String},
            runnerName: {type:String},
            userSelect:{type:String},
            contentSelect:{type:String},
            contentLeft: {type:String},
            contentRight: {type:String},
            milliseconds: {type:Number},
        }
    ]
})

module.exports = mongoose.model("iat_userDscore", userDscore);

