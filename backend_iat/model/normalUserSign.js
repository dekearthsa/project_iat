const mongoose = require("mongoose"); 

const normalUserSign = new mongoose.Schema({
    firstname: {type:String},
    lastname: {type:String},
    phone_num: {type:String},
    sex: {type: String},
    birthday: {type:String},
    personalities: {type:String}
})

module.exports = mongoose.model("iat_user_detail", normalUserSign);

