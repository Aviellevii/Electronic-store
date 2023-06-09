const express = require('express');
const router = express.Router();

const {CreateOrder,getOrder,payOrder} = require('../controllers/order.controller');
const {Auth,isAdmin} = require('../middleware/auth.mid');

router.post('/pay',Auth,payOrder);
router.post('/create-order',Auth,CreateOrder);
router.get('/get-order',Auth,getOrder);


module.exports = router;