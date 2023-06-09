const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    numViews:{
        type:Number,
        default:0
    },
    isLiked:{
        type:Boolean,
        default:false
    },
    isDisLiked:{
        type:Boolean,
        required:false
    },
    likes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    Dislikes:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }],
    images:{
        url:{
            type:String
        },
        public_id:{
            type:String
        }
    },
    author: {
        type:String,
        default:"Admin"
    },
},{
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    },
    timestamps:true
})

module.exports = mongoose.model("Blog", blogSchema);