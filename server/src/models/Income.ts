import { Schema, model, models, Document } from 'mongoose'

interface IIncome extends Document {
  title: string
  amount: number
  description?: string
  status: 'pending' | 'approved' | 'rejected'
  frequency: 'one-time' | 'daily' | 'weekly' | 'bi-weekly' | 'monthly' | 'quarterly' | 'annually'
  date?: Date
}

const IncomeSchema = new Schema<IIncome>({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  description: { type: String },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  frequency: { type: String, enum: ['one-time', 'daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually'] },
  date: { type: Date, default: Date.now },
})

export const Income = models.Income || model<IIncome>('Income', IncomeSchema)
