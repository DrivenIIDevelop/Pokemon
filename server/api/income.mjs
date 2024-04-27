import { mongooseConnect } from "@/lib/mongoose";
import { Income } from "@/models/Income";

export default async function handle(req, res) {
    const {method} = req; 
    await mongooseConnect();


    if ( method === 'GET') {
        if (req.query?.id) {
            res.json(await Income.findOne({_id:req.query.id}));
        } else { 
            res.json(await Income.find());
        }
    }

    if (method === 'POST') {
        const {title,amount,description,status,frequency,date} = req.body;
        const incomeDoc = await Income.create({
            title,amount,description,status, frequency, date,
        })
        res.json(incomeDoc)
    }

    if (method === 'PUT') {
        const {title,amount,description,status,frequency,date} = req.body;
        await Income.updateOne({_id}, {title,amount,description,status,frequency,date,})
        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Income.deleteOne({_id:req.query?.id});
            res.json(true);
        }
    }
}