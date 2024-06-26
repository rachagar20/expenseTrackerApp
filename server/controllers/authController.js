import {User }from "../model/user_model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const categories = [
        {label: "Travel",icon:"user" },
        {label:"Investment",icon:"user" },
        {label:"Fun",icon:"user" },
        {label:"Miscellaneous",icon:"user" }
];

export const registerUser=async (req,res)=>{
    const {email,password,firstName,lastName}=req.body;
    const user=await User.findOne({email});
    if(user!==null){
        return res.status(406).json({message:"User Already Exists"})
    }
    const saltRounds=10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const createdUser=await User.create({email,password:hashedPassword,firstName,lastName,categories});
    res.status(201).json({message:
        "User is created Successfully."
    })
}

export const loginUser=async(req,res)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user===null){
        return res.status(406).json({message:"User does not exist."})
    }
    const isCorrect=bcrypt.compareSync(password, user.password);

    if(!isCorrect){
        return res.status(406).json({message:"User Credentials do not match!!"})

    }

    //jwt token need
    const payload={
        username:email,
        id:user._id
    }
    const token=jwt.sign({payload},process.env.JWT_SECRET)

    res.json({message:"User Signed In Successfully",token,user});


}