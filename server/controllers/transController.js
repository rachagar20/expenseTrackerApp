import {Transaction} from "../model/transaction_model.js"
export const getTransactionDetails=async(req,res)=>{
    console.log(req.user)
    const transactionDetails=await Transaction.find({user_id:req.user._id});
    res.status(200).json(transactionDetails);
}

export const createTransaction=async (req,res)=>{
    const {amount,description,date,type}=req.body;
    await Transaction.create({amount,description,date,user_id:req.user.id,category_id:req.body.category_id,typeOfTrans:type});
    res.status(200).json({message:"SUCCESS"});
}

export const deleteTransaction=async(req,res)=>{
    const {id}=req.params;
    await Transaction.findOneAndDelete({_id:id});
    res.status(200).json(
        {
            message:"Success"
        }
    )
}

export const editTransaction=async(req,res)=>{
    const {id}=req.params;
    await Transaction.findByIdAndUpdate({_id:id},
    {
        $set:{
            amount:req.body.amount,
            description:req.body.description,
            date:req.body.date,
            user_id:req.user._id,
            category_id:req.body.category_id,
            typeOfTrans:req.body.type
        }
    
    });
    res.status(200).json(
        {
            message:"Success"
        }
    )
}