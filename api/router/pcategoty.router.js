const express = require('express');
const router = express.Router();

const {createCategory,getAllCategoty,updateCategoty,deleteCategory,getPcategory} = require('../controllers/pcategory.controller');
const {Auth,isAdmin} = require('../middleware/auth.mid');

router.post('/',Auth,isAdmin,createCategory);
router.get('/',getAllCategoty);
router.get('/:id',getPcategory);
router.delete('/:id',Auth,isAdmin,deleteCategory);
router.patch('/:id',Auth,isAdmin,updateCategoty);

module.exports = router;