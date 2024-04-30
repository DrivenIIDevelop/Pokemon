import { Router } from 'express'
import { Budget } from '../models/Budget'

export const budgetRouter = Router()

budgetRouter.get('/', async (req, res) => {
  const budgets = await Budget.find()
    .populate({ path: 'categories', populate: { path: 'expenses' } })
    .exec()
  res.json(budgets)
})

budgetRouter.get('/:id', async (req, res) => {
  const budget = await Budget.findOne({ _id: req.params.id })
    .populate({ path: 'categories', populate: { path: 'expenses' } })
    .exec()
  res.json(budget)
})

budgetRouter.post('/:id', async (req, res) => {
  const { budgetName, goalAmount, description, goalDate, status } = req.body
  const budgetDoc = await Budget.create({ budgetName, goalAmount, description, goalDate, status })
  res.json(budgetDoc)
})

budgetRouter.put('/:id', async (req, res) => {
  const result = await Budget.updateOne({ _id: req.params.id }, req.body)
  res.json(result.acknowledged)
})

budgetRouter.delete('/:id', async (req, res) => {
  const result = await Budget.deleteOne({ _id: req.params.id })
  res.json(result.acknowledged)
})

export default budgetRouter
