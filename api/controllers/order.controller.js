const User = require('../models/user.model');
const Cart = require('../models/cart.model')
const Product = require('../models/product.model')
const Order = require('../models/order.model')

const asyncHandler = require('express-async-handler');

//create order to user
const CreateOrder = asyncHandler(async(req,res)=>{
    const {_id} = req.user;
    const { address,fullname,email,phone,total} = req.body;
    try{
    //find cart by user
    const userCart = await Cart.find({userId:_id});
   //find order by user
    const OrderExist = await Order.find({orderBy:_id});
    //check if user have order and remove the order 
    if(OrderExist){
        await Order.findOneAndRemove({orderBy:_id});
    }
    let carts = [];
    for(let i=0; i<userCart.length;i++ ){
        let object = {};
        object.product = userCart[i]._id;
        carts.push(object);
    }
    const order = {
        cart:carts,
        address,
        fullname,
        email,
        phone,
        total,
        orderStatus:"Not Processed",
        orderBy:_id
    }
    //create order
    const createOrder = await Order.create(order);
    res.send(createOrder);
    }catch(error){
        throw new Error(error);
    }
})
//get order by id
const getOrder = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    try{
        const order = await Order.findOne({orderBy:_id}).populate("cart.product")
        res.send(order);
    }catch(error){
        throw new Error(error)
    }
})
//pay order
const payOrder = asyncHandler(async(req,res) => {
    const {_id} = req.user;
    const {paymentIntent} = req.body;
    try{
        //find order by id
        const order = await Order.findOne({orderBy:_id});
        //if order not exist send error message
        if(!order){
             res.status(401).send('order not found');
             return;
        }
        //change order paymentIntent and status
        order.paymentIntent = paymentIntent; 
        order.orderStatus = "Cash on Delivery";

        await order.save();
        res.send(order._id);

    }catch(error){
        throw new Error(error)
    }
})
module.exports = {CreateOrder,getOrder,payOrder}