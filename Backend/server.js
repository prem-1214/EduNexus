import dotenv from 'dotenv'
<<<<<<< HEAD
import  app  from './app.js'
import connectDB from './db/conn.js'

dotenv.config({
    path : './.env'
=======
import app from './app.js'
import connectDB from './db/conn.js'

dotenv.config({
    path: './.env'
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 8000, () =>{
<<<<<<< HEAD
        console.log(`Server is running at http://localhost:${process.env.PORT}`)
    })
})
.catch((error) =>{
    console.log("Mongodb connection failed...", error)
})

app.get('/', (req, res)=>{
=======
        console.log(`server is running at port : http://localhost:${process.env.PORT}`)
    })
}).catch((error) =>{
    console.log("error during connecting to")
})


app.get('/', (req, res) => {
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
    res.send("home...")
})




