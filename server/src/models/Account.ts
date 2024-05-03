import { Schema, model, models, Document } from 'mongoose'

interface IAccount extends Document {
  username: string
  firstname: string
  lastname: string
  email: string
  password: string
}

const AccountSchema = new Schema<IAccount>({
  username: { type: String, required: true },
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
})

export const Account = models.Account || model<IAccount>('Account', AccountSchema)
