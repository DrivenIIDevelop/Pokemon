import { Router } from 'express'
import { Expense } from '../models'

export const router = Router()

export type GetResponseBody = Expense | null

router.get('/:id', async (req, res) => {
  const expense = await Expense.findOne({ _id: req.params.id }).exec()
  res.json(expense)
})

export type CreateRequestBody = Omit<Expense, '_id'>
export type CreateResponseBody = Expense

router.post('/:id', async (req, res) => {
  const { title, amount, description, frequency, date, category } = req.body
  const expenseDoc = await Expense.create({ title, amount, description, frequency, date, category })
  res.json(expenseDoc)
})

export type UpdateRequestBody = Omit<Expense, '_id' | 'expense'>
export type UpdateResponseBody = Expense

router.put('/:id', async (req, res) => {
  const { title, amount, description, frequency, date, category } = req.body
  const updatedExpense = await Expense.findOneAndUpdate(
    { _id: req.params.id },
    { title, amount, description, frequency, date, category },
  ).exec()
  res.json(updatedExpense)
})

export type DeleteResponseBody = boolean

router.delete('/:id', async (req, res) => {
  const result = await Expense.deleteOne({ _id: req.params.id }).exec()
  res.json(result.acknowledged)
})
