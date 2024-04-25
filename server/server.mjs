import dotenv from 'dotenv';
import express from 'express';
import { mongooseConnect } from './lib/mongoose.mjs';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB using mongooseConnect function
mongooseConnect()
    .then(() => {
        console.log('MongoDB connected successfully');
        
        // Define routes and middleware
        app.get('/', (req, res) => {
            res.send('Hello Backend Devs!');
        });

        // Start the server
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
