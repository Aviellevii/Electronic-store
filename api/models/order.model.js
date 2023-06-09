const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    cart:[{
        product: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Cart"
        }
    }],
    address:{
        type:String,
        required:true
    },
    fullname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    total:{
        type:Number,
        required:true  
    },
    paymentIntent: {},
    orderStatus: {
        type:String,
        default:"Not Processed",
        enum: [
            "Not Processed",
            "Cash on Delivery",
            "Processing",
            "Dispatched",
            "Cancelled",
            "Delivered"
        ]
    },
    orderBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},{
    timestamps:true
})

module.exports = mongoose.model("Order",OrderSchema);