import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import videoRouter from './routes/video.routes.js'
import fileRouter from './routes/file.routes.js'
import userRouter from './routes/user.routes.js'



const app = express()

app.use(cors({
    origin : "*",
    credentials : true
}))

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.json())
app.use(express.urlencoded({extended : true}))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cookieParser())

 



// routes
app.use('/auth', authRouter)
app.use('/video', videoRouter)  
app.use('/file', fileRouter)  
app.use('/user', userRouter)


export default app