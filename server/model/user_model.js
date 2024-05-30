import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    firstName:{ 
        type:String, 
        required:[true,"FirstName is a required Field"]
    },
    lastName:{
        type:String, 
        required:[true,"LastName is a required Field"]
    },
    email:{
        type:String, 
        required:[true,"Email is a required Field"]
    },
    password:{
        type:String, 
        required:[true,"Password is a required Field"]
    }

},{timestamps:true})

export const User=mongoose.model("User",userSchema);