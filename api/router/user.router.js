const express = require('express');
const router = express.Router();
const {Register,Login,getAllUsers,getUser,updateUser,deleteUser,blockUser,unblockUser
    ,forgotPasswordToken,resetPassword,SaveAddress} = require('../controllers/user.controller');
const {Auth,isAdmin} = require('../middleware/auth.mid');
router.get('/',Auth,isAdmin,getAllUsers);
router.post('/register',Register);
router.post('/login',Login);

router.put('/save-Address',Auth,SaveAddress);

router.post('/forgot-pass',forgotPasswordToken);
router.put('/reset-password/:id/:token',resetPassword);
router.put('/block-user/:id',Auth,isAdmin,blockUser);
router.put('/unblock-user/:id',Auth,isAdmin,unblockUser);
router.get('/:id',Auth,isAdmin,getUser);
router.patch('/:id',Auth,isAdmin,updateUser);
router.delete('/:id',Auth,isAdmin,deleteUser);



module.exports = router;