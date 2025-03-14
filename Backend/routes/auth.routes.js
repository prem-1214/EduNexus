import {Router} from 'express'

const router = Router()

router.route('/login')
.get((req, res) =>{
        const {email, password} = req.body
        res.send("auth login page...")
        console.log("email :", email + "password :", password)

})
 
export default router