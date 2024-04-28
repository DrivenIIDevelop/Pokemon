import { mongooseConnect } from '../lib/mongoose'
import { Income } from '../models/Income'
import { Request, Response } from 'express'

export default async function handle(req: Request, res: Response): Promise<void> {
  const { method } = req
  await mongooseConnect()

  if (method === 'GET') {
    if (req.query?.id) {
      const income = await Income.findOne({ _id: req.query.id })
      res.json(income)
    } else {
      const incomes = await Income.find()
      res.json(incomes)
    }
  } else if (method === 'POST') {
    const { title, amount, description, status, frequency, date } = req.body
    const incomeDoc = await Income.create({ title, amount, description, status, frequency, date })
    res.json(incomeDoc)
  } else if (method === 'PUT') {
    await Income.updateOne({ _id: req.query.id }, req.body)
    res.json(true)
  } else if (method === 'DELETE') {
    if (req.query?.id) {
      await Income.deleteOne({ _id: req.query.id })
      res.json(true)
    }
  }
}
