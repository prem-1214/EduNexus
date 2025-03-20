import mongoose from "mongoose"
<<<<<<< HEAD
import app from "../app.js"

const connectDB = async () =>{
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`)
   .then(() =>{
    console.log("Connected to Mongodb")
    app.on("error", (error) =>{
        console.log("Error during connecting to database", error)
    })
=======

const connectDB = async () =>{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
    .then(() =>{
    console.log("Connected to Mongodb")
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4

   })
   .catch((error) =>{
    console.log("Error connecting to mongodb", error)
    process.exit(1)
   })
}

export default connectDB