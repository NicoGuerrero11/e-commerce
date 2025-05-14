import express from 'express';
import { PORT } from './config/config.js';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import productRoutes from "./routes/product.routes.js";

const app = express()

// middleware
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api', productRoutes)


const starServer = async () => {
    // connect to MongoDB
    await connectDB();
    // connect to server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

starServer()