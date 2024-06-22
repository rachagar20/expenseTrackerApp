import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connectMongoDB from './database/mongoConnect.js';
import passport from 'passport';
import passportConfig from './configuration/passport.js';
import dotenv from 'dotenv';
import router from './routes/index.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize Passport
app.use(passport.initialize());
passportConfig(passport);

// Routes
app.use('/', router);

// Connect to MongoDB
connectMongoDB();

// Define the port
const port = process.env.PORT || 3000;

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

export default app;
