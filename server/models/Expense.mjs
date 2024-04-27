import pkg from 'mongoose'; 
const {Schema, model, models} = pkg;

const ExpenseSchema = new Schema({
    title: {type: String, req:true},
    amount: {type: Number, req: true},
    desciption: {type: String},
    frequency: {
        type: String,
        enum: [ 'weekly', 'bi-weekly', 'monthly', 'quarterly', 'annually']
        },
    date: { type: Date, default: Date.now }
})

export const Expense = models.Expense || model('Expense', ExpenseSchema)
