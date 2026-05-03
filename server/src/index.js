import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes  from './routes/auth.routes.js';
import cookieParser from "cookie-parser";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// middelwares 

app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res) => {
    res.send("Hospital management system..");
});


app.use('/api/auth', authRoutes)


app.listen(PORT, () => {
   connectDB()
   console.log(`Server is running on http://localhost:${PORT}`);
})