import mongoose, { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  number: string;
  password: string;
  people: any[];
  groups: any[];
  expenses: {
    expense: any;
  }[];
  pictureURL: String;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IExpense extends Document {
  amount: number;
  paidBy: any;
  isSettledUp: boolean;
  name: String;
  date: Date;
  category: String;
  sharedBy: {
    user: any;
  }[];
  group: mongoose.Types.ObjectId;
  description?: String;
  createdBy: mongoose.Types.ObjectId;
  updatedBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IMember {
  user: mongoose.Types.ObjectId;
  balance: {
    owed: number;
    owedTo: number;
  };
}

export interface ICategory extends Document {
  name: string;
  isCustom?: boolean;
  createdBy: any;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IGroup extends Document {
  name: string;
  members: any;
  createdAt?: Date;
  updatedAt?: Date;
  expenses?: any;
}
