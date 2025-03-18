import mongoose from "mongoose"
// import app from "../app.js"

const connectDB = async () =>{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
    // const connectionInstance = await mongoose.connect("mongodb+srv://EduNexus:EduNexus@edunexus.9vwq7.mongodb.net/EduNexus")
    .then(() =>{
    console.log("Connected to Mongodb")
    // app.on("error", (error) =>{
    //     console.log("Error during connecting to database", error)
    // })

   })
   .catch((error) =>{
    console.log("Error connecting to mongodb", error)
    process.exit(1)
   })
}

export default connectDB