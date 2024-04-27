import { mongooseConnect } from "@/lib/mongoose";
import { Transaction } from "@/models/Transaction";

export default async function handle(req, res) {
    const {method} = req; 
    await mongooseConnect();


    if ( method === 'GET') {
        if (req.query?.id) {
            res.json(await Transaction.findOne({_id:req.query.id}));
        } else { 
            res.json(await Transaction.find());
        }
    }

    if (method === 'POST') {
        const {title,amount,description,date} = req.body;
        const transactionDoc = await Transaction.create({
            title,amount,description,date,
        })
        res.json(transactionDoc)
    }

    if (method === 'PUT') {
        const {title,amount,description,date} = req.body;
        await Transaction.updateOne({_id}, {title,amount,description,date})
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Transaction.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}