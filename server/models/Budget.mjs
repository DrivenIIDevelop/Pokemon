import pkg from 'mongoose'; 
const {Schema, model, models} = pkg;

const BudgetSchema = new Schema({
    budgetName: {type: String, req:true},
    goalAmount: {type: Number, req: true},
    description: {type: String},
    goalDate: { type: Date, default: Date.now },
    status: {type: String,
        enum: ['in progress', 'completed', 'canceled',],
        default:'pending'},
})

export const Budget = models.Budget || model('Budget', BudgetSchema)
