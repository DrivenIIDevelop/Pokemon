import { Router } from 'express'
import { Budget } from '../models/Budget'

export const budgetsRouter = Router()

export type GetAllResponseBody = PopulatedBudget[]

budgetsRouter.get('/', async (_, res) => {
  const budgets = await Budget.find()
    .populate({ path: 'categories', populate: { path: 'expenses' } })
    .exec()
  res.json(budgets)
})
