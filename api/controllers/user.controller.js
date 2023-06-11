const User = require('../models/user.model');
const asyncHandler = require('express-async-handler');
const bcrypt  = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendMail = require('./email.controller');

//create user account
const Register = asyncHandler(
    async(req,res)=>{
        try{
            const {firstname,lastname,email,mobile,password} = req.body;
            const user_email = await User.findOne({email});
            //check if email already exist
            if(user_email){
                res.status(400).send('This Email has Exist');
                return ;
            }
            const passwordHash = await bcrypt.hash(password, 10);
            const user  = {
                firstname,
                lastname,
                email,
                mobile,
                password:passwordHash
            }
            const createUser = await User.create(user);
            res.send(createJWT(createUser))
        }catch(error){
            throw new Error(error);
        }
    }
) 

const Login = asyncHandler(async(req,res) => {
    try{
        const {email, password} = req.body;
        
        const user = await User.findOne({email});
        if(user && (await bcrypt.compare(password,user.password))){
            res.send(createJWT(user));
        }
        else{
            res.status(400).send('user or password not exist');
            return;
        }
    }catch(error){
        throw new Error(error);
    }
})

//get all users

const getAllUsers = asyncHandler(async(req,res)=>{
    try{
        const users = await User.find();
        res.send(users);
    }catch(error){
        throw new Error(error);
    }
})

//get one user
const getUser = asyncHandler(async(req,res) => {
    try{
       const {id} = req.params;
       const user = await User.findById({_id:id});
       res.send(user);
    }catch(error){
        throw new Error(error);
    }
})

//update user 
const updateUser = asyncHandler(async(req,res) => {
    try{
       const {id} = req.params;
       const user = await User.findByIdAndUpdate({_id:id},req.body,{new:true});
       res.send(user);
    }catch(error){
        throw new Error(error);
    }
})
//delete user
const deleteUser = asyncHandler(async(req,res) => {
    try{
       const {id} = req.params;
       const user = await User.findByIdAndDelete({_id:id});
       res.send(user);
    }catch(error){
        throw new Error(error);
    }
})

//block user

const blockUser = asyncHandler(async(req,res) => {
    try{
       const {id} = req.params;
       const user = await User.findByIdAndUpdate({_id:id},{isBlocked:true},{new:true});
       res.send(user);
    }catch(error){
        throw new Error(error);
    }
})

//unblock user

const unblockUser = asyncHandler(async(req,res) => {
    try{
       const {id} = req.params;
       const user = await User.findByIdAndUpdate({_id:id},{isBlocked:false},{new:true});
       res.send(user);
    }catch(error){
        throw new Error(error);
    }
})

//send link to email when user forgot password
const forgotPasswordToken = asyncHandler(async(req,res) =>{
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user) {
        res.status(400).send('the email not found');
        return;
    }
    try{
        const secret = process.env.JWT_SECRET + user.password;
        //create token to 10 minutes
        const token = jwt.sign({id:user._id,email:user.email},secret,{expiresIn:"10m"})
        await user.save();
        const resetUrl = `follow this link to reset your password this link valid to 10 minutes <a href='https://electronic-store23.netlify.app/reset-password/${user._id}/${token}'>click here</>`
        const data = {
            to:email,
            text:'Hey user',
            subject: "Forgot password link",
            htm: resetUrl
        };
        sendMail(data);
        res.json(token);
    }catch(error){
        throw new Error(error);
    }
})

const resetPassword = asyncHandler(async(req,res)=>{
    try{
        const {id , token} = req.params;
        const {password} = req.body;
        const user = await User.findOne({_id:id});
        if(!user){
            res.status(401).send('the user not found');

            return;
        }
        const secret = process.env.JWT_SECRET + user.password;
        const verify =  jwt.verify(token,secret);
        if(verify){
            const passwordHash = await bcrypt.hash(password,10);

            await User.findByIdAndUpdate({_id:id},{password:passwordHash},{new:true})
        }
        res.send({
            'message':'password update',
            'status': 'success'
        })
    }catch(error){
        throw new Error(error)
    }
})

const SaveAddress = asyncHandler(async(req,res) => {
    const { _id } = req.user;
    try{
        const user = await User.findByIdAndUpdate(
            {_id:_id},
            {address:req.body.address},
            {new:true}
            );
            res.send(user);
    }catch(error){
        throw new Error(error);
    }
})

//create token
const createJWT = (user) => {
    const token = jwt.sign({_id:user._id,email:user.email,role:user.role},process.env.JWT_SECRET,{expiresIn:"30d"})

    return {
        _id:user.id,
        firstname:user.firstname,
        lastname:user.lastname,
        email:user.email,
        mobile:user.mobile,
        role:user.role,
        isBlocked:user.isBlocked,
        token:token
    }}





module.exports = {Register, Login,getAllUsers,getUser,updateUser,deleteUser,blockUser,unblockUser,forgotPasswordToken
    ,resetPassword,SaveAddress};
