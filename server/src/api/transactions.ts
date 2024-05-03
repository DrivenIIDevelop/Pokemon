import { mongooseConnect } from '../lib/mongoose'
import { Transaction } from '../models/Transaction'
import { Request, Response } from 'express'

export default async function handle(req: Request, res: Response): Promise<void> {
  const { method } = req
  await mongooseConnect()

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Transaction.findOne({ _id: req.query.id }))
    } else {
      res.json(await Transaction.find())
    }
  } else if (method === 'POST') {
    const { title, amount, description, date } = req.body
    const transactionDoc = await Transaction.create({ title, amount, description, date })
    res.json(transactionDoc)
  } else if (method === 'PUT') {
    await Transaction.updateOne({ _id: req.query.id }, req.body)
    res.json(true)
  } else if (method === 'DELETE') {
    if (req.query?.id) {
      await Transaction.deleteOne({ _id: req.query.id })
      res.json(true)
    }
  }
}
