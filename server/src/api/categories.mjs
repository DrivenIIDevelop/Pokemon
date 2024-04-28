import { mongooseConnect } from "@/lib/mongoose";
import { Category } from "@/models/Category";

export default async function handle(req,res) {
    const {method}= req;
    await mongooseConnect();

if (method === 'GET') {
    res.json(await Category.find().populate('parent'))
}


    if (method === 'POST') {
        const {name, parentCategory, properties} = req.body; 
        const parent = parentCategory === '' ? null : parentCategory;
        const categoryDoc = await Category.create({
            name, 
            parent: parent || undefined,
            properties,
        });
        res.json(categoryDoc)
    }

    if (method === 'PUT') {
        const {name, parentCategory,properties,_id, } = req.body; 
        const parent = parentCategory === '' ? null : parentCategory;
        const categoryDoc = await Category.updateOne({_id},{
            name, 
            parent: parent || undefined,
            properties,
        });
        res.json(categoryDoc)
    }

    if (method === 'DELETE') {
        const {_id} = req.query;
        await Category.deleteOne({_id});
        res.json('ok');
    }
}