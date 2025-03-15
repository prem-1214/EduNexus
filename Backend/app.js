import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.routes.js'
import cookieParser from 'cookie-parser'

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


export default app