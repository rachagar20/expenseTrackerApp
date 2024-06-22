import { Router } from "express";
const router=Router();
import transactionRouter from "./transactionRoute.js"
import authRouter from "./authRoute.js"
import userRouter from "./userRoute.js"
import categoryRouter from "./categoryRoute.js"
import passport from "passport";
router.use("/",(req,res)=>{
    res.send("HELLO")
})
router.use("/transaction",passport.authenticate("jwt",{session:false}),transactionRouter)
router.use("/auth",authRouter)
router.use("/user",userRouter)
router.use("/category",passport.authenticate("jwt",{session:false}),categoryRouter)

export default router