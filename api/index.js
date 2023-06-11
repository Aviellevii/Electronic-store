const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const bodyparser = require('body-parser');
const DbConnect = require('./database/dbcontext');
const authrouter = require('./router/user.router');
const productrouter = require('./router/product.router');
const blogrouter = require('./router/blog.router');
const cartrouter = require('./router/cart.router');
const orderrouter = require('./router/order.router');
const pcategotyrouter = require('./router/pcategoty.router');

const fileUpload = require('express-fileupload');

const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name:process.env.CloudName,
    api_key:process.env.Api_Key,
    api_secret:process.env.Api_Secret
})

DbConnect();
app.use(cors());

app.use(bodyparser.urlencoded({extended:true}))
app.use(bodyparser.json());
app.use(fileUpload({
    useTempFiles: true,
}))

app.use('/api/user',authrouter);
app.use('/api/product',productrouter);
app.use('/api/blog',blogrouter);
app.use('/api/cart',cartrouter);
app.use('/api/order',orderrouter);
app.use('/api/pcategoty',pcategotyrouter);


const port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`listen on port ${port}`)
})
