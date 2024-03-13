const {userTypes}=require("../utils/constant")

const verifyUpdatedRequest=(req,res,next)=>{
    console.log(req.query)
    const  approveduser=JSON.parse(req.query.approved) ;
    console.log(approveduser)
    console.log(req.params)
    const userId=req.params.userId;
    console.log(req.params)

    if(approveduser && req.user.usertype!==userTypes.admin){
        return res.status(403).send({message:"Only Admin User are allowed to approve other users"})

    }

    req.metadata={
        approveduser,userId
    }
    next()
}

module.exports={
    verifyUpdatedRequest
}