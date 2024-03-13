const usermodel=require('../models/user.model');
const { userStatus }=require('../utils/constant');

const getAllUsers=async(req,res)=>{
    const {userId , password}=req.body
    try{
        const user=await usermodel.findOne({userId})
        if(!user){res.send(400).send("UserId is Incorrect")}
        if(user.usertype!=="ADMIN"){res.send(400).send("Invalid User Type")}
        const users=await usermodel.find({});
        return res.send(users);
    }
    catch(err){
        return res.status(500).send({message:err.message})
    }
}

const updateUser=async(req,res)=>{
    const {approvedUser,userId}=req.metadata;
    try{
        if(approvedUser){
            const user=await usermodel.findByIdAndUpdate({userid:userId},{userstatus:userStatus.approved});
            if(!user){return res.status(400).send({message:"Invalid user Id Passed"})}
    }
    return res.status(200).send({message:"User Approved Successfully"}
    )
    }
    catch(err){
        console.log(err);
    }
}

module.exports={getAllUsers,updateUser}