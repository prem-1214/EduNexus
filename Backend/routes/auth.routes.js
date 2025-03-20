import {Router} from 'express'
<<<<<<< HEAD
=======
import { loginHandler, registerHandler } from '../controllers/user.controller.js'
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4


const router = Router()

<<<<<<< HEAD
router.route('/login')
.post((req, res) =>{
        const {email, password} = req.body
        console.log("email : ", email + " password :", password)
        res.end("axios data posted....")
})

router.route('/google-login')
.post((req, res) =>{
=======
router.route('/register')
.post(registerHandler)

router.post('/login', loginHandler)

router.route('/google-login') 
.post((req, res) =>{ 
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4
        const {email, password} = req.body
        console.log("email from google-login", email)
        res.end("google-login successful....")
})


export default router