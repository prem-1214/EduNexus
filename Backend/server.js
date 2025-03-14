import dotenv from 'dotenv'
import { app } from './app.js'


dotenv.config({
    path : './.env'
})



app.get('/', (req, res)=>{
    res.send("home...")
})

app.listen(process.env.PORT || 8000, () =>{
    console.log(`Server is running at http://localhost:${process.env.PORT}`)
})