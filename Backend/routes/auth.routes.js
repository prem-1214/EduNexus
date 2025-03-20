import {Router} from 'express'
import { loginHandler, registerHandler } from '../controllers/user.controller.js'


const router = Router()

router.route('/register')
.post(registerHandler)

router.post('/login', loginHandler)

router.route('/google-login') 
.post((req, res) =>{ 
        const {email, password} = req.body
        console.log("email from google-login", email)
        res.end("google-login successful....")
})


export default router