import { Router } from 'express'
import { Budget } from '../models/Budget'

export const budgetRouter = Router()

export type GetAllResponseBody = PopulatedBudget[]

budgetRouter.get('/', async (req, res) => {
  const budgets = await Budget.find()
    .populate({ path: 'categories', populate: { path: 'expenses' } })
    .exec()
  res.json(budgets)
})
