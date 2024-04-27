import pkg from 'mongoose'; 
import mongoose from 'mongoose'; 
const {Schema, model, models} = pkg;

const CategorySchema = new Schema({
    name: {type:String, required:true},
    parent: { type:mongoose.Schema.Types.ObjectId, ref:'Category'},
    properties: [{type:Object,}]
});

export const Category = models?.Category || model('Category', CategorySchema);