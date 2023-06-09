const { default: mongoose } = require("mongoose");

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        lowercase: true
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    category:{type:mongoose.Schema.Types.ObjectId, ref:"Pcategory"},
    brand:{
        type:String,
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    sold:{
        type:Number,
        default:0
    },
    images:{
        url:{
            type:String
        },
        public_id:{
            type:String
        }
    },
    color:{
        type:String,
        required:true
    },
    ratings: [
        {
            star:Number,
            postedby:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
            comment:String
        }
    ],
    totalRating:{
        type:String,
        default:0
    }
},{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);