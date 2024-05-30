import {User }from "../model/user_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
export const registerUser=async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    const user=await User.findOne({email});
    console.log(user);
    if(user!==null){
        return res.status(406).json({message:"User Already Exists"})
    }
    const saltRounds=10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(hashedPassword)
    const createdUser=await User.create({email,password:hashedPassword,firstName,lastName});
    res.status(201).json({message:
        "User is created Successfully."
    })
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user===null){
        return res.status(406).json({message:"USER DOES NOT EXIST"})
    }
    const isCorrect=bcrypt.compareSync(password, user.password);

    if(!isCorrect){
        return res.status(406).json({message:"Password is Incorrect"})

    }

    //jwt token need
    const payload={
        username:email,
        id:user._id
    }
    const token=jwt.sign({payload},process.env.JWT_SECRET)
    console.log(process.env.JWT_SECRET)

    res.json({message:"User Signed In Successfully",token,user});


}