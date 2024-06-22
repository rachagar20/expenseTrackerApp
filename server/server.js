import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectMongoDB from "./database/mongoConnect.js";
import passport from "passport";
import passportConfig from "./configuration/passport.js";
import dotenv from "dotenv";
import router from "./routes/index.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use(passport.initialize());
passportConfig(passport);
app.use("/", router);

connectMongoDB();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app; 
