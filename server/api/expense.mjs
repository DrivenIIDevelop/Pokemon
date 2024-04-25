import { mongooseConnect } from "@/lib/mongoose";
import { Expense } from "@/models/Expense";

export default async function handle(req, res) {
    const {method} = req; 
    await mongooseConnect();


    if ( method === 'GET') {
        if (req.query?.id) {
            res.json(await Expense.findOne({_id:req.query.id}));
        } else { 
            res.json(await Expense.find());
        }
    }

    if (method === 'POST') {
        const {title,amount,description,frequency,date} = req.body;
        const expenseDoc = await Expense.create({
            title,amount,description,frequency,date,
        })
        res.json(expenseDoc)
    }

    if (method === 'PUT') {
        const {title,amount,description,frequency,date} = req.body;
        await Expense.updateOne({_id}, {title,amount,description,frequency,date,})
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Expense.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}