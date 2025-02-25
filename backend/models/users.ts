import mongoose, { Schema, Model } from 'mongoose';
import { IUser } from '../types/db';

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    number: { type: String, required: true },
    password: { type: String, required: true },
    people: [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
    expenses: [
      {
        expense: { type: Schema.Types.ObjectId, ref: 'Expense' },
      },
    ],
    pictureURL: {
      type: String,
      default: 'https://slicksplit.s3.us-west-1.amazonaws.com/usericon.png',
    },
  },
  {
    timestamps: true,
  },
);

const User: Model<IUser> = mongoose.model<IUser>('Users', userSchema);

module.exports = User;
