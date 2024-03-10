const mongoose=require('mongoose');
const { userTypes, userStatus } = require('../utils/constant');

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        minLength:10,
        unique:true,
        index:true,
        validate:function(v){
            return /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/.test(v);
        }
    },
    userType:{
        type:String,
        required:true,
        enum:Object.values(userTypes),
        default:userTypes.customer,
        index:true
    },
    userStatus:{
        type:String,
        required:true,
        enum:Object.values(userStatus),
        default:userStatus.pending
    }
},{timestamps:true});

module.exports=mongoose.model("User",userSchema);