const express = require('express');
const router = express.Router();
const {userCart,getCart,emptyCart,ChangeQuantity,deleteProduct} = require('../controllers/cart.controller');
const {Auth} = require('../middleware/auth.mid');

router.post('/',Auth,userCart);
router.get('/',Auth,getCart);
router.delete('/delete-cart',Auth,emptyCart);
router.put('/change-quantity',Auth,ChangeQuantity);
router.delete('/delete-product/:id',Auth,deleteProduct);


module.exports = router;