const express = require('express');
const router = express.Router();

const {createPost,getAllPost,getPost,deletePost,updatePost,likeBlog,dislikeBlog} = require('../controllers/blog.controller');
const {Auth,isAdmin} = require('../middleware/auth.mid');

router.post('/',Auth,isAdmin,createPost);
router.get('/',getAllPost);
router.put('/liked',Auth,likeBlog);
router.put('/disliked',Auth,dislikeBlog)
router.get('/:id',getPost);
router.delete('/:id',Auth,isAdmin,deletePost);
router.patch('/:id',Auth,isAdmin,updatePost);

module.exports = router;