const jwt = require('jsonwebtoken');
//miidleware to check if user authorize
const Auth = (req,res,next) => {
    try{
    //get token from headers
    const token = req.headers.authorization;
    //if token not exist
    if(!token){
        //send authorize error
        res.status(401).send('user not athorize')
        return;
    }
    //verify token
     jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
        if(err){
            res.status(401).send('user not athorize')
            return;
        }
        //put user details in req.user
        req.user = user;
        next();
     })
    }catch(error){
        throw new Error(error);
    }
}
//check if user is admin
const isAdmin = (req,res,next) => {
    const {role} = req.user;
    if( role !== 'admin'){
        res.status(401).send('user not athorize')
        return;
    }else{
        next();
    }
}

module.exports = {Auth,isAdmin};