import mongoose, { Schema, Model } from 'mongoose';
import { IGroup } from '../types/db';

const groupSchema = new Schema(
  {
    name: { type: String, required: true },
    users: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    expenses: [{ type: Schema.Types.ObjectId, ref: 'Expenses' }],
  },
  {
    timestamps: true,
  },
);

const Group: Model<IGroup> = mongoose.model<IGroup>('Groups', groupSchema);

module.exports = Group;
