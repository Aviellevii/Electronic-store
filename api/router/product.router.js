const express = require('express');
const router = express.Router();

const {createProduct,getProducts,getProduct,updateProducts,deleteProducts,productcategorytag} = require('../controllers/product.controller');
const {Auth,isAdmin} = require('../middleware/auth.mid');

router.post('/',Auth,isAdmin,createProduct);
router.get('/',getProducts);
router.get('/tag/:tagName',productcategorytag);

router.get('/:id',getProduct);

//only admin can change delete or uploud product 
router.patch('/:id',Auth,isAdmin,updateProducts);
router.delete('/:id',Auth,isAdmin,deleteProducts);

module.exports = router;