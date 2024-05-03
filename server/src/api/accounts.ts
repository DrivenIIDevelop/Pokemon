import { Router } from 'express'
import { Account } from '../models'

export const accountRouter = Router()

export type GetResponseBody = Account | null

accountRouter.get('/:id', async (req, res) => {
  const account = await Account.findOne({ _id: req.params.id }).exec()
  res.json(account)
})

export type CreateRequestBody = Omit<Account, '_id'>
export type CreateResponseBody = Account

accountRouter.post('/', async (req, res) => {
  const { username, firstname, lastname, email, password } = req.body
  const accountDoc = await Account.create({ username, firstname, lastname, email, password })
  res.json(accountDoc)
})

export type UpdateRequestBody = Omit<Account, '_id' | 'account'>
export type UpdateResponseBody = Account

accountRouter.put('/:id', async (req, res) => {
  const { title, amount, description, frequency, date, category } = req.body
  const updatedAccount = await Account.findOneAndUpdate(
    { _id: req.params.id },
    { title, amount, description, frequency, date, category },
  ).exec()
  res.json(updatedAccount)
})

export type DeleteResponseBody = boolean

accountRouter.delete('/:id', async (req, res) => {
  const result = await Account.deleteOne({ _id: req.params.id }).exec()
  res.json(result.acknowledged)
})
