import pkg from 'mongoose'; 
const {Schema, model, models} = pkg;

const IncomeSchema = new Schema({
    title: {type: String, req:true},
    amount: {type: Number, req: true},
    description: {type: String},
    status: {type: String,
            enum: ['pending', 'approved', 'rejected',],
            default:'pending'},
    frequency: {
        type: String,
        enum: ['one-time', 'daily', 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually']
        },
    date: { type: Date, default: Date.now }
    })

export const Income = models.Income || model('Income', IncomeSchema)
