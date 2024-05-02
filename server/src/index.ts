import dotenvFlow from 'dotenv-flow'
import express from 'express'
import { budgetsRouter, categoriesRouter, expensesRouter } from './api'
import { mongooseConnect } from './lib/mongoose'
import './models'

dotenvFlow.config({ path: '../', default_node_env: 'development' })

connectDatabase().then(() => {
  const { VITE_API_PORT, VITE_API_HOST } = process.env
  const port = VITE_API_PORT ? parseInt(VITE_API_PORT) : 300
  const host = VITE_API_HOST || 'localhost'
  createApi().listen()
  createApi().listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`)
  })
})

function createApi() {
  const app = express()
  app.use(express.json())
  app.use('/budgets', budgetsRouter)
  app.use('/categories', categoriesRouter)
  app.use('/expenses', expensesRouter)
  return app
}

async function connectDatabase() {
  try {
    await mongooseConnect()
    console.log('MongoDB connected successfully')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    throw err
  }
}
