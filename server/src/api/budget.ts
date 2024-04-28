import { mongooseConnect } from "../lib/mongoose";
import { Budget } from "../models/Budget";
import { Request, Response } from 'express';

export default async function handle(req: Request, res: Response): Promise<void> {
  const { method } = req;
  await mongooseConnect();

  if (method === 'GET') {
    if (req.query?.id) {
      res.json(await Budget.findOne({_id: req.query.id}));
    } else {
      res.json(await Budget.find());
    }
  } else if (method === 'POST') {
    const { budgetName, goalAmount, description, goalDate, status } = req.body;
    const budgetDoc = await Budget.create({ budgetName, goalAmount, description, goalDate, status });
    res.json(budgetDoc);
  } else if (method === 'PUT') {
    await Budget.updateOne({ _id: req.query.id }, req.body);
    res.json(true);
  } else if (method === 'DELETE') {
    if (req.query?.id) {
      await Budget.deleteOne({_id: req.query.id});
      res.json(true);
    }
  }
}
