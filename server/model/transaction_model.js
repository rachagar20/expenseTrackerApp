import mongoose from "mongoose";

const transactionSchema=new mongoose.Schema({
    amount:{
        type:Number
    },
    description:{
        type:String,
    },
    date:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",transactionSchema);




