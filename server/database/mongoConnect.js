import mongoose from "mongoose"
const connectMongoDB=()=>{
    const username=process.env.MONGO_DB_USERNAME;
    const password=process.env.MONGO_DB_PASSWORD;
    const url=process.env.MONGO_DB_URL;
    const cluster=process.env.MONGO_DB_CLUSTER;
    mongoose.connect(`mongodb+srv://${username}:${password}@${url}/?retryWrites=true&w=majority&appName=${cluster}`)
    .then(()=>{console.log("MONGODB CONNECTION WAS SUCCESSFUL")})
    .catch((error)=>{console.log("Some Error Occurred.",error.message)})
}

export default connectMongoDB
