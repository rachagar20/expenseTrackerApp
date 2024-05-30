import { Router } from "express";
import passport from "passport"
import {Transaction} from "../model/transaction_model.js"
const router=Router();


router.get("/", passport.authenticate('jwt', { session: false }),async(req,res)=>{
    const transactionDetails=await Transaction.find({});
    res.status(200).json(transactionDetails);
})
router.post("/",async (req,res)=>{
    const {amount,description,date}=req.body;
    await Transaction.create({amount,description,date});
    res.status(200).json({message:"SUCCESS"});
})


router.delete('/:id',async(req,res)=>{
    const {id}=req.params;
    await Transaction.findOneAndDelete({_id:id});
    res.status(200).json(
        {
            message:"Success"
        }
    )
})

router.patch('/:id',async(req,res)=>{
    const {id}=req.params;
    await Transaction.findByIdAndUpdate({_id:id},{$set:req.body});
    res.status(200).json(
        {
            message:"Success"
        }
    )
})
export default router;