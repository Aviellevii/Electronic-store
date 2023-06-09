const mongoose = require('mongoose');

const productCategory = new mongoose.Schema({
    title:{type:String, required:true}
})

module.exports = mongoose.model("Pcategory",productCategory);