import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import transactionRouter from "./routes/transactionRoute.js"
import authRouter from "./routes/authRoute.js"
import userRouter from "./routes/userRoute.js"
import connectMongoDB from "./database/mongoConnect.js";
import passport from "passport";
import passportConfig from "./configuration/passport.js"
import dotenv from "dotenv";
dotenv.config();

const app=express();


app.use(cors());
app.use(bodyParser.json())
app.use(passport.initialize());
passportConfig(passport);
app.use("/transaction",transactionRouter)
app.use("/auth",authRouter)
app.use("/user",userRouter)
connectMongoDB();
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})