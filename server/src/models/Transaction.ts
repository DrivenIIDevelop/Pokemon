import { Schema, model, models } from 'mongoose'

const TransactionSchema = new Schema({
  title: { type: String, req: true },
  amount: { type: Number, req: true },
  desciption: { type: String },
  date: { type: Date, default: Date.now },
})

export const Transaction = models.Transaction || model('Transaction', TransactionSchema)
