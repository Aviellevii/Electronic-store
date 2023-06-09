const User = require('../models/user.model');
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')

const asyncHandler = require('express-async-handler');
//add product to user cart
const userCart = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    const {productId,quantity} = req.body;

    try{
    //check if product exist in user cart
     const productExist = await Cart.findOne({userId:_id,productId:productId})
     if(productExist)
     {
        res.send('product already exist');
        return;
     }
     //find product by id
     const product = await Product.findOne({_id:productId})
     const cart = {
        userId:_id,
        productId:productId,
        total: product.price * quantity
     }
     //create cart
     const createCart = await Cart.create(cart);
     res.send(createCart);
    }catch(error){
        throw new Error(error);
    }
})

//get cart by user id
const getCart = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    try{
        //get cart details and show product
        const cart = await Cart.find({userId:_id}).populate("productId");
        res.send(cart);
    }catch(error){
        throw new Error(error);
    }
})

//change quantity
const ChangeQuantity = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    const {productId,quantity} = req.body;
    //find product by id
    const product = await Product.findOne({_id:productId})
    try{
        //update quantity and total price in cart
        const cart = await Cart.findOneAndUpdate(
            {userId:_id,
            productId:productId},
            {
            quantity:quantity,
            total: product.price * quantity
            }
            ,
            {new:true}
            )
        res.send(cart);
    }catch(error){
        throw new Error(error);
    }

})
//delete product in cart
const deleteProduct = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    const {id} = req.params;
    try{
        const cart = await Cart.findOneAndRemove({userId:_id,productId:id});
        res.send(cart);
    }catch(error){
        throw new Error(error);
    }
})

//delete user cart
const emptyCart = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    try{
        const cart = await Cart.findOneAndRemove({userId:_id});
        res.send(cart);
    }catch(error){
        throw new Error(error);
    }
})

module.exports = {userCart,getCart,emptyCart,ChangeQuantity,deleteProduct}