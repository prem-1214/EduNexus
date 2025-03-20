import express from 'express'
import cors from 'cors'
<<<<<<< HEAD
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'
=======
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import videoRouter from './routes/video.routes.js'


>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4

const app = express()

app.use(cors({
    origin : "*",
    credentials : true
}))

<<<<<<< HEAD
=======
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

<<<<<<< HEAD

=======
 
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4



// routes
app.use('/auth', authRouter)
<<<<<<< HEAD
=======
app.use('/video', videoRouter)  
>>>>>>> 1c9ca375505d585ffa70f5e793ab959de7065ec4


export default app