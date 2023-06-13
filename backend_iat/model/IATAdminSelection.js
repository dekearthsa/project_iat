const mongoose = require("mongoose"); 

const IATAdminSelection = new mongoose.Schema({
    runner: {type:String},
    is_selection: {type: Boolean}
})

module.exports = mongoose.model("IAT_selection", IATAdminSelection);

