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
    },
    user_id:{
        type:mongoose.Types.ObjectId
    },
    category_id:{
        type:mongoose.Types.ObjectId
    }
},{timestamps:true})

export const Transaction=mongoose.model("Transaction",transactionSchema);




