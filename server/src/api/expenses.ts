import { Router } from 'express'
import { Expense } from '../models'

export const expensesRouter = Router()

export type GetResponseBody = Expense | null

expensesRouter.get('/:id', async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id }).exec()
  res.json(expense)
})

export type CreateRequestBody = Omit<Expense, '_id'>
export type CreateResponseBody = Expense

expensesRouter.post('/', async (req, res) => {
  const { title, amount, description, frequency, date, category } = req.body
  const expenseDoc = await Expense.create({ title, amount, description, frequency, date, category })
  res.json(expenseDoc)
})

export type UpdateRequestBody = Partial<Omit<Expense, '_id' | 'expense'>>
export type UpdateResponseBody = Expense

expensesRouter.put('/:id', async (req, res) => {
  const { title, amount, description, frequency, date, category } = req.body
  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: req.params.id },
    { title, amount, description, frequency, date, category },
    { new: true },
  ).exec()
  res.json(updatedExpense)
})

export type DeleteResponseBody = boolean

expensesRouter.delete('/:id', async (req, res) => {
  const result = await Expense.deleteOne({ _id: req.params.id }).exec()
  res.json(result.acknowledged)
})
