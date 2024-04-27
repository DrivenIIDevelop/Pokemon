import dotenv from 'dotenv';
import express from 'express';
import { mongooseConnect } from './lib/mongoose.mjs';
import jwt from 'jsonwebtoken';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())

const posts = [
    {
        username: 'user 1 ',
        title:'post 1'
    },
    {
        username: 'user 2',
        title:'post 2'
    }
]

app.get('/posts', authenticateToken, (req,res) => {
    res.json(posts => post.username = req.user.name)
})

app.post('/login', (req,res) => {
    // authenticate user
    const username = req.body.username
    const user = { name: username}

    const accessToken = generateAcessToken(user)
    const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
    res.json({ accessToken: accessToken, refreshToken: refreshToken })
})

//token refresh 
function generateAcessToken(user) {
    return jwt.sign(user,process.env.ACCESS_TOKEN_SECRET, {expiresIn: '30s'})
}

//middleware
function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
}



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

