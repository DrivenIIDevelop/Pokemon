import { Schema, Types, model } from 'mongoose'
import type { ICategory } from '.'

export interface IExpense extends Omit<Expense, '_id' | 'date'> {
  _id: Types.ObjectId
  date: Date
}

const ExpenseSchema = new Schema<IExpense>({
  title: { type: String, req: true },
  amount: { type: Number, req: true },
  description: { type: String },
  frequency: {
    type: String,
    enum: ['weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'],
  },
  date: { type: Date, required: true },
})

export const Expense = model('Expense', ExpenseSchema)
