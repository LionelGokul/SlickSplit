import mongoose, { Schema, Model } from 'mongoose';
import { IExpense } from '../types/db';

const expenseSchema = new Schema(
  {
    name: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true, default: Date.now },
    paidBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    sharedBy: [
      {
        user: { type: Schema.Types.ObjectId, ref: 'Users' },
      },
    ],
    group: { type: Schema.Types.ObjectId, ref: 'Groups' },
    category: {
      type: String,
      required: true,
    },
    isSettledUp: { type: Boolean, required: true, default: false },
    description: { type: String },
    createdBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
    updatedBy: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  },
  {
    timestamps: true,
  },
);

const Expense: Model<IExpense> = mongoose.model<IExpense>(
  'Expenses',
  expenseSchema,
);

module.exports = Expense;
