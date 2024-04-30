import { Router } from 'express'
import { Category } from '../models'

export const router = Router()

export type GetResponseBody = Category

router.get('/:id', async (req, res) => {
  const budget = await Category.findOne({ _id: req.params.id }).exec()
  res.json(budget)
})

export type CreateRequestBody = Omit<Category, '_id'>
export type CreateResponseBody = Category

router.post('/:id', async (req, res) => {
  const { budget, name, limit, icon } = req.body
  const budgetDoc = await Category.create({ budget, name, limit, icon })
  res.json(budgetDoc)
})

export type UpdateRequestBody = Omit<Category, '_id' | 'budget'>
export type UpdateResponseBody = Category

router.put('/:id', async (req, res) => {
  const { name, limit, icon } = req.body
  const updatedCategory = await Category.findOneAndUpdate({ _id: req.params.id }, { name, limit, icon }).exec()
  res.json(updatedCategory)
})

export type DeleteResponseBody = boolean

router.delete('/:id', async (req, res) => {
  const result = await Category.deleteOne({ _id: req.params.id }).exec()
  res.json(result.acknowledged)
})
