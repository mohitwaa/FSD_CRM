const jwt=require('jsonwebtoken');
const usermodel=require('../models/user.model');
const {userTypes}=require("../utils/constant");

const verifyToken=async(req,res,next)=>{

    const token=req.headers['key'];
    try{
        if(!token){return res.status(400).send({message:"No Token Provided "})}
        var payload=jwt.verify(token,process.env.SECRET);
        const user=await usermodel.findOne({userId:payload.id});
        req.user=user;
        next();
    }
    catch(err){return res.status(403).send({message:"Invalid JWt passed "})}
}


const isAdmin=async(req,res,next)=>{
    if(req.user.usertype!==userTypes.admin){
        return res.status(403).send({message:"Only Admin Users are allowed to access this Route"})
    }
    next();
}

module.exports={
    verifyToken,
    isAdmin
}