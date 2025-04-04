import mongoose from "mongoose"

const connectDB = async () =>{
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}${process.env.DB_NAME}`)
    .then(() =>{
    console.log("Connected to Mongodb")

   })
   .catch((error) =>{
    console.log("Error connecting to mongodb", error)
    process.exit(1)
   })
}

export default connectDB