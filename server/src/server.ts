import dotenv from 'dotenv'
import express, { Request, Response, NextFunction } from 'express'
import { mongooseConnect } from './lib/mongoose'
import jwt from 'jsonwebtoken'

dotenv.config()

const app = express()
const PORT = process.env.PORT || '3000'

app.use(express.json())

interface User {
    name: string
}

interface Post {
    username: string;
    title: string;
}

const posts: Post[] = [
    { username: 'user 1', title: 'post 1' },
    { username: 'user 2', title: 'post 2' }
];

app.get('/posts', authenticateToken, (req: Request, res: Response) => {
    // @ts-ignore
    const user = req.user
    res.json(posts.filter(post => post.username === user.name));
});

app.post('/login', (req: Request, res: Response) => {
    const username: string = req.body.username
    const user: User = { name: username }
    const accessToken: string = generateAccessToken(user)
    const refreshToken: string = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET || '')
    res.json({ accessToken, refreshToken })
})

function generateAccessToken(user: User): string {
    return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET || '', { expiresIn: '30s' })
}

function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader: string | undefined = req.headers['authorization']
    const token: string | undefined = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || '', (err, user: any) => {
        if (err) return res.sendStatus(403)
        // @ts-ignore
        req.user = user
        next()
    })
}

mongooseConnect()
    .then(() => {
        console.log('MongoDB connected successfully')
        app.get('/', (req: Request, res: Response) => {
            res.send('Hello Backend Devs!')
        })
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`)
        })
    })
    .catch(err => {
        console.error('MongoDB connection error:', err)
    })
