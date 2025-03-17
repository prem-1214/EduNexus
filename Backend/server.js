import dotenv from 'dotenv'
import  app  from './app.js'
import connectDB from './db/conn.js'

dotenv.config({
    path : './.env'
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log("Mongodb connection failed...", error)
})

app.get('/', (req, res)=>{
    res.send("home...")
})




