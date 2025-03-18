import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/conn.js'

dotenv.config({
    path: './.env'
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
        console.log(`server is running at port : http://localhost:${process.env.PORT}`)
    })
}).catch((error) =>{
    console.log("error during connecting to")
})


app.get('/', (req, res) => {
    res.send("home...")
})




