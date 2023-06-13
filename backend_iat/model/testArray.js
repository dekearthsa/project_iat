const mongoose = require("mongoose"); 

const testArray = new mongoose.Schema({
    test: String,
    arrays: Array
})

module.exports = mongoose.model("testArray", testArray);

