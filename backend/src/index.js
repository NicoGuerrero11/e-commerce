import express from 'express';
import { PORT } from './config/config.js';
import connectDB from './config/db.js';
import authRouter from './routes/auth.routes.js';
import productRoutes from "./routes/product.routes.js";
import orderRoutes from "./routes/order.routes.js";

const app = express()

import cors from 'cors';

app.use(cors({
    origin: 'http://localhost:5173', // origen de tu frontend con Vite
    credentials: true
}));


// middleware
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api', productRoutes)
app.use('/api', orderRoutes)


const startServer = async () => {
    await connectDB();
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};
startServer();


export default app;