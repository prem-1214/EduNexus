import express, {Router} from 'express'


const router = Router()

router.route('/login')
.post((req, res) =>{
        const {email, password} = req.body
        console.log("email : ", email + " password :", password)
        res.end("axios data posted....")
})

router.route('/google-login')
.post((req, res) =>{
        const {email} = req.body
        console.log("email from google-login", email)
        res.end("google-login successful....")
})


// app.get('/login', (req, res) =>{
//         // const {email, password} = req.body
//         res.send("auth login page...")
//         // console.log("email :", email + "password :", password)

// })
 
export default router