import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.routes.js';
import videoRouter from './routes/video.routes.js';
import fileRouter from './routes/file.routes.js';
import userRouter from './routes/user.routes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(cors({
    origin: "*",
    credentials: true
}));

app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
    res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Detect environment
const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
    // Serve static files from the React frontend build
    app.use(express.static(path.join(__dirname, '../Frontend/dist')));

    // Handle React routing, return index.html
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
    });
}

// Routes
app.use('/auth', authRouter);
app.use('/video', videoRouter);
app.use('/file', fileRouter);
app.use('/user', userRouter);

export default app;
