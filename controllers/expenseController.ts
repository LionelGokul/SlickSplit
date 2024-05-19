import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { IExpense } from '../types/db';

const HttpError = require('../models/httpError');
const Expense = require('../models/expenses');
const Users = require('../models/users');

const addExpense: RequestHandler = async (req, res, next) => {
  const expense: IExpense = req.body.expense;
  const sharedBy = expense.sharedBy.map((val) => ({ user: val }));

  const newExpense = new Expense({
    name: expense.name,
    amount: expense.amount,
    paidBy: expense.paidBy,
    sharedBy: sharedBy,
    date: expense.date,
    group: expense.group || null,
    category: expense.category,
    description: expense.description,
    createdBy: req.body.userId,
    updatedBy: req.body.userId,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newExpense.save({ session: session });
    const uniqueUserIds = [...new Set([expense.paidBy, ...expense.sharedBy])];

    if (uniqueUserIds.length > 0) {
      await Users.updateMany(
        { _id: { $in: uniqueUserIds } },
        { $push: { expenses: { expense: newExpense._id } } },
      );
    }
    await session.commitTransaction();

    res.status(201).json({
      message: 'Created Expense successfully',
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const updateExpense: RequestHandler = async (req, res, next) => {
  const expenseData: IExpense = req.body.expense;
  const expenseId = req.params.eid;
  const sharedBy = expenseData.sharedBy.map((val) => ({ user: val }));

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Expense.updateOne(
      { _id: expenseId },
      {
        $set: {
          name: expenseData.name,
          amount: expenseData.amount,
          paidBy: expenseData.paidBy,
          sharedBy: sharedBy,
          date: expenseData.date,
          group: expenseData.group || null,
          category: expenseData.category,
          description: expenseData.description,
          updatedBy: req.body.userId,
        },
      },
      {
        session,
      },
    );
    await session.commitTransaction();

    res.status(201).json({
      message: 'Created Expense successfully',
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const deleteExpense: RequestHandler = async (req, res, next) => {
  const expenseId = req.params.eid;

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await Expense.deleteOne(
      { _id: expenseId },
      {
        session,
      },
    );
    await session.commitTransaction();

    res.status(204).json({
      message: 'Deleted Expense successfully',
    });
  } catch (err) {
    const error = new HttpError(
      'Something went wrong, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

module.exports = {
  addExpense,
  updateExpense,
  deleteExpense,
};
