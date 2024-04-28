import { mongooseConnect } from '../lib/mongoose'
import { Expense } from '../models/Expense'
import { Request, Response } from 'express'

export default async function handle(req: Request, res: Response): Promise<void> {
  const { method } = req
  await mongooseConnect()

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Expense.findOne({ _id: req.query.id }))
    } else {
      res.json(await Expense.find())
    }
  } else if (method === 'POST') {
    const { title, amount, description, frequency, date } = req.body
    const expenseDoc = await Expense.create({ title, amount, description, frequency, date })
    res.json(expenseDoc)
  } else if (method === 'PUT') {
    const { title, amount, description, frequency, date } = req.body
    await Expense.updateOne({ _id: req.query.id }, { title, amount, description, frequency, date })
    res.json(true)
  } else if (method === 'DELETE') {
    if (req.query?.id) {
      await Expense.deleteOne({ _id: req.query.id })
      res.json(true)
    }
  }
}
