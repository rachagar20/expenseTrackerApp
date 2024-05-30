import { Router } from "express";
const router=Router();
import transactionRouter from "./transactionRoute.js"
import authRouter from "./authRoute.js"
import userRouter from "./userRoute.js"
import passport from "passport";

router.use("/transaction",passport.authenticate("jwt",{session:false}),transactionRouter)
router.use("/auth",authRouter)
router.use("/user",userRouter)

export default router