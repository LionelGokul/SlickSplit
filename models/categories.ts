import mongoose from 'mongoose';
import { ICategory } from '../types/db';

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    name: { type: String, required: true },
    isCustom: { type: Boolean },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users' },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model<ICategory>('Categories', categoriesSchema);

module.exports = Category;
