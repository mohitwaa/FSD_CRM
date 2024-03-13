const bcrypt = require('bcrypt')
const usermodel =require('../models/user.model')
const {userTypes , userStatus}=require('../utils/constant')
const jwt=require("jsonwebtoken")


const register = async (req,res)=>{
    const {name,userId,email,password,usertype}=req.body;
    const hashedPassword=bcrypt.hashSync(password,10);
    const user={
        name,
        userId,
        email,
        password:hashedPassword,
        usertype,
        userstatus:userStatus.approved
    }
    
    const newUser=new usermodel(user);
    try{
        await newUser.save();
        return res.status(201).send({message:` Registration Succesfull `});
    }
    catch(err){
        if(err.code===11000){
            return res.status(400).send({message:" UserId/email already exist in Database"});
        }
        return res.status(500).send({message:err.message})
    }
}

const login=async(req,res)=>{
    const {userId,password}=req.body;
    if(!userId || !password){
        return res.status(400).send({message:"userId/password is not passed !"})
    }
    try{
        const user=await usermodel.findOne({userId:userId});
        if(!user){res.status(400).send({message:"userID is invalid"})}

        const isPasswordValid=bcrypt.compareSync(password,user.password);
        if(!isPasswordValid){return res.status(400).send({message:"Invalid password"})}

        if(user.userstatus!==userStatus.approved){
            return res.status(400).send({message:"user status must be approved to loggin"})
        }
        
        const token=jwt.sign({id:userId},process.env.SECRET,{expiresIn:"1h"})

        return res.status(200).send({
            name:user.name,
            userId:user.userId,
            email:user.email,
            usertype:user.usertype,
            userstatus:user.status,
            accessToken:token
        })
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
    
}

module.exports={register , login};