const Blog = require('../models/blog.model');
const asyncHandler = require('express-async-handler');

const cloudinary = require('cloudinary').v2;

const createPost = asyncHandler(async(req,res) => {
    try{
        const file = req.files.file;
        await cloudinary.uploader.upload(file.tempFilePath, (err,result) => {
            req.body.images = {
                url:result.url,
                public_id:result.public_id
            }
        })
        const newBlog = await Blog.create(req.body);
        res.send(newBlog);

    }catch(error){
        throw new Error(error);
    }
})

const getAllPost = asyncHandler(async(req,res) => {
    try{
        const blogs = await Blog.find();
        res.send(blogs);
    }catch(error){
        throw new Error(error);
    }
})

const getPost = asyncHandler(async(req,res) => {
    try{
        const {id} = req.params;
        const blog = await Blog.findById(id);

        await Blog.findByIdAndUpdate(
            id,
            {$inc:{numViews:1}},
            {new:true}
        )
        res.send(blog);
    }catch(error){
        throw new Error(error);
    }
})

const deletePost = asyncHandler(async(req,res) => {
    try{
        const {id} = req.params;
        const blogFromDb = await Blog.findById(id);
        const blogImgId = blogFromDb.images.public_id;
        await cloudinary.uploader.destroy(blogImgId);
        const blog = await Blog.findByIdAndRemove(id);
        res.send(blog);
    }catch(error){
        throw new Error(error);
    }
})


const updatePost = asyncHandler(async(req,res) => {
    try{
        const {id} = req.params;   
        const blogFromDb =  await Blog.findById(id);
        const imageId = blogFromDb.images.public_id;
        if(!req.files){
           const newblog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
           res.send(newblog);
        }
        else{
            const file = req.files.file;
            await cloudinary.uploader.destroy(imageId);
            await cloudinary.uploader.upload(file.tempFilePath, (err,result) =>{
                req.body.images = {
                    url:result.url,
                    public_id:result.public_id
                }
             })
             const newblog = await Blog.findByIdAndUpdate(id,req.body,{new:true});
             res.send(newblog);
        }
        
        
    }catch(error){
        throw new Error(error);
    }
})

const likeBlog = asyncHandler(async(req,res) => {
    const {blogId} = req.body;

    const blog = await Blog.findById({_id:blogId});
    const loginUserId = req?.user?._id;
    const isLiked = blog?.isLiked;

    const alreadyDisliked = blog?.Dislikes?.find((userId) => userId.toString() === loginUserId.toString());
    if(alreadyDisliked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $pull:{Dislikes:loginUserId},
                isDisLiked:false
            },{new:true});
            return res.send(blog);
    }
    if(isLiked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $pull:{likes:loginUserId},
                isLiked:false
            },{new:true});
            return res.send(blog);
    }else{
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $push:{likes:loginUserId},
                isLiked:true
            },{new:true});
            return res.send(blog);
    }
})

const dislikeBlog = asyncHandler(async(req,res) => {
    const {blogId} = req.body;

    const blog = await Blog.findById({_id:blogId});
    const loginUserId = req?.user?._id;
    const isDisLiked = blog?.isDisLiked;

    const alreadyliked = blog?.likes?.find((userId) => userId.toString() === loginUserId.toString());
    if(alreadyliked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $pull:{likes:loginUserId},
                isLiked:false
            },{new:true});
            return res.send(blog);
    }
    if(isDisLiked){
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $pull:{Dislikes:loginUserId},
                isDisLiked:false
            },{new:true});
            return res.send(blog);
    }else{
        const blog = await Blog.findByIdAndUpdate({_id:blogId},
            {
                $push:{Dislikes:loginUserId},
                isDisLiked:true
            },{new:true});
            return res.send(blog);
    }
})


module.exports = {createPost,getAllPost,getPost,deletePost,updatePost,likeBlog,dislikeBlog}