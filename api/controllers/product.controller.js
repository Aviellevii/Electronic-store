const Product = require('../models/product.model');
const asycHandler = require('express-async-handler');
const slugify = require('slugify');
const User = require('../models/user.model');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CloudName,
    api_key:process.env.Api_Key,
    api_secret:process.env.Api_Secret
})
//create new product
const createProduct = asycHandler(async(req,res) => {
    try{
      const file = req.files.file;
      //uploud file pictute to cloudinary
       await cloudinary.uploader.upload(file.tempFilePath, (err,result) =>{
       const {title,description,price,brand,quantity,category,color} = req.body;
       product = new Product({
        title,
        slug:slugify(title),
        description,
        price,
        brand,
        quantity,
        category,
        images:{
            url:result.url,
            public_id:result.public_id
        },
        color
       })
    })
    //save new product in databasse
    product.save()
    .then(result => {
        res.status(200).json({
            new_product:result
        })
    })
    
    }catch(error){
        throw new Error(error);
    }
})

//get all products
const getProducts = asycHandler(async(req,res) => {
    try{
        const products = await Product.find().populate('category');
        res.send(products);
    }catch(error){
        throw new Error(error);
    }
})

//get product by category
const productcategorytag = asycHandler(async(req,res)=>{
    try{
        const {tagName} = req.params;
        const product = await Product.find().populate('category');
        const productCategory = product.filter(p => p.category?._id == tagName)
        res.send(productCategory);
    }catch(error){
        throw new Error(error);
    }
})

//get one prodeuct by id
const getProduct = asycHandler(async(req,res) => {
    try{
        const {id} = req.params;
        const product = await Product.findById({_id:id}).populate('category');
        res.send(product);
    }catch(error){
        throw new Error(error);
    }
})


const updateProducts = asycHandler(async(req,res) => {
    try{
        const {id} = req.params;   
        //find product by id and get image bublic id
        const productFromDb =  await Product.findById({_id:id});
        const imageId = productFromDb.images.public_id;
        //if not choose new picture
        if(!req.files){
          const product = await Product.findByIdAndUpdate({_id:id},req.body,{new:true});
          res.send(product);
        }
        //if choose new picture
        else{
            const file = req.files.file;
            //delete old picture by public id from cloudinary
            await cloudinary.uploader.destroy(imageId);
            //uplod new photo to cloudinary
            await cloudinary.uploader.upload(file.tempFilePath, (err,result) =>{
                //change image product details
                req.body.images = {
                    url:result.url,
                    public_id:result.public_id
                }
             })
            const newproduct = await Product.findByIdAndUpdate({_id:id},req.body,{new:true});
            res.send(newproduct);
        }
        
    }catch(error){
        throw new Error(error);
    }
})

const deleteProducts = asycHandler(async(req,res) => {
    try{
        const {id} = req.params;
        const findProd = await Product.findById({_id:id});
        const ImgId = findProd.images.public_id;
       //delete  picture by public id from cloudinary
        await cloudinary.uploader.destroy(ImgId);
        const product = await Product.findByIdAndRemove({_id:id});
        res.send(product);
    }catch(error){
        throw new Error(error);
    }
})


// const AddToWishList = asycHandler(async(req,res) => {
//     const {_id} = req.user;
//     const {propId} = req.body;

//     try{
//         const user = await User.findById({_id:_id});
//         const alreadyadded = user.wishlist.find((id) => id.toString() === propId);

//         if(alreadyadded){
//             const user = await User.findByIdAndUpdate(
//                 {_id:_id},
//                 {
//                     $pull: {wishlist:propId},
//                 },{new:true})
//             res.send(user);
//         }else{
//             const user = await User.findByIdAndUpdate(
//                 {_id:_id},
//                 {
//                     $push: {wishlist:propId},
//                 },{new:true})
//             res.send(user);
//         }
//     }catch(error){
//         throw new Error(error);
//     }
// })

// const getWishList = asycHandler(async(req,res) => {
//     const {_id} = req.user;
//     try{
//         const findUser = await User.findById({_id:_id}).populate('wishlist');
//         res.send(findUser);
//     }catch(error){
//         throw new Error(error)
//     }
// })
module.exports = {createProduct,getProducts,getProduct,updateProducts,deleteProducts,productcategorytag}