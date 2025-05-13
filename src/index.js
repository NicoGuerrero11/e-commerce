import express from 'express';
import { PORT } from './config/config.js';
import connectDB from './config/db.js';

const app = express()



const starServer = async () => {
    // connect to MongoDB
    await connectDB();
    // connect to server
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

starServer()