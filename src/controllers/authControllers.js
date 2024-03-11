const bcrypt = require('bcrypt')
const usermodel =require('../models/user.model')
const {userTypes , userStatus}=require('../utils/constant')

const register = async (req,res)=>{
    const {name,userId,email,password,usertype}=req.body;
    const hashedPassword=bcrypt.hashSync(password,10);
    const user={
        name,
        userId,
        email,
        password:hashedPassword,
        usertype,
        userstatus:(usertype===userTypes.customer)?userStatus.approved:userStatus.pending
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

module.exports={register};