import { mongooseConnect } from "@/lib/mongoose";
import { Budget } from "@/models/Budget";

export default async function handle(req, res) {
    const {method} = req; 
    await mongooseConnect();


    if ( method === 'GET') {
        if (req.query?.id) {
            res.json(await Budget.findOne({_id:req.query.id}));
        } else { 
            res.json(await Budget.find());
        }
    }

    if (method === 'POST') {
        const {budgetName,goalAmount,description,goalDate,status} = req.body;
        const budgetDoc = await Budget.create({
            budgetName,goalAmount,description,goalDate,status
        })
        res.json(budgetDoc)
    }

    if (method === 'PUT') {
        const {budgetName,goalAmount,description,goalDate,status} = req.body;
        await Budget.updateOne({_id}, {budgetName,goalAmount,description,goalDate,status})
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Budget.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}