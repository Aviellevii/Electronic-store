const cloudinary = require('cloudinary').v2;


cloudinary.config({
    cloud_name:process.env.CloudName,
    api_key:process.env.Api_Key,
    api_secret:process.env.Api_Secret
})

