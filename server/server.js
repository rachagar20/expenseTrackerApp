import express, { response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDB from "./database/mongoConnect.js";
import passport from "passport";
import passportConfig from "./configuration/passport.js"
import dotenv from "dotenv";
import router from "./routes/index.js";
dotenv.config();


const app=express();


app.use(cors());
app.use(bodyParser.json())
//passport
app.use(passport.initialize());
passportConfig(passport);

//routes
app.use("/",router)

connectMongoDB();
app.listen(3000,()=>{
    console.log("Server is listening on port 3000")
})