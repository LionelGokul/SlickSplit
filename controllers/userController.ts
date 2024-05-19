import { RequestHandler } from 'express';
import mongoose from 'mongoose';
import { IExpense, IUser } from '../types/db';
const bcrypt = require('bcryptjs');

const HttpError = require('../models/httpError');
const User = require('../models/users');
const Expense = require('../models/expenses');
const jwt = require('jsonwebtoken');

const addUser: RequestHandler = async (req, res, next) => {
  const userData: IUser = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: userData.email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      'User exists already, please login instead.',
      403,
      {},
      'small',
    );
    return next(error);
  }

  let hashedPassword;
  try {
    hashedPassword = await bcrypt.hash(userData.password, 12);
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  const newUser = new User({
    name: userData.name,
    email: userData.email,
    password: hashedPassword,
    number: userData.number,
  });

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await newUser.save({ session: session });
    await session.commitTransaction();

    res.status(201).json({
      message: 'Created user successfully',
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Signing up failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const login: RequestHandler = async (req, res, next) => {
  const { email, password } = req.body;

  let user;
  try {
    user = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('Could not find the user.', 403, {}, 'small');
    return next(error);
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, user.password);
  } catch (err) {
    const error = new HttpError(
      'Could not log you in, please check your credentials and try again.',
      500,
      err,
      'small',
    );
    return next(error);
  }

  if (!isValidPassword) {
    const error = new HttpError(
      'Invalid credentials, could not log you in.',
      403,
      {},
      'small',
    );
    return next(error);
  }

  let token;
  try {
    token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.JWT_KEY,
      { expiresIn: '6h' },
    );
  } catch (err) {
    const error = new HttpError(
      'Logging in failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  res.json({
    userId: user._id,
    name: user.name,
    email: user.email,
    token,
  });
};

const addPeople: RequestHandler = async (req, res, next) => {
  const email = req.body.email;
  const userId = req.params.uid;

  let friend;
  try {
    friend = await User.findOne({ email });
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!friend) {
    const error = new HttpError('User does not exist.', 404, {}, 'small');
    return next(error);
  }
  console.log(friend.id);

  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await User.updateOne(
      { _id: userId },
      { $addToSet: { people: friend.id } },
      {
        session,
      },
    );
    await session.commitTransaction();

    res.status(201).json({
      message: 'Created user successfully',
    });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Signing up failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const getPeople: RequestHandler = async (req, res, next) => {
  const userId = req.params.uid;

  let user: IUser;
  try {
    user = await User.findOne({ _id: userId })
      .populate('people', 'name email pictureURL')
      .lean();
  } catch (err) {
    const error = new HttpError(
      'Signing up failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!user) {
    const error = new HttpError('User does not exist.', 404, {}, 'small');
    return next(error);
  }

  let people = user.people.map((val) => {
    return {
      ...val,
      id: val._id.toString(),
      amountOwed: 0,
    };
  });

  let expenses;
  try {
    expenses = await Expense.find({
      isSettledUp: false,
      $or: [{ paidBy: userId }, { 'sharedBy.user': userId }],
    })
      .populate({
        path: 'paidBy sharedBy.user',
        select: 'name email pictureURL',
      })
      .lean();
  } catch (err) {
    const error = new HttpError(
      'Fetching expenses failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  let peopleExpense: any = [];

  expenses.forEach((expense: IExpense) => {
    const share = expense.amount / expense.sharedBy.length;

    // If current user paid the expense
    if (expense.paidBy._id.toString() === userId) {
      expense.sharedBy.forEach((shared) => {
        // checking if the user is also not in the sharedBy
        if (shared.user._id.toString() !== userId) {
          peopleExpense.push({
            id: shared.user._id.toString(),
            name: shared.user.name,
            email: shared.user.email,
            pictureURL: shared.user.pictureURL,
            amountOwed: share,
          });
        }
      });
    } else {
      peopleExpense.push({
        id: expense.paidBy._id.toString(),
        name: expense.paidBy.name,
        email: expense.paidBy.email,
        pictureURL: expense.paidBy.pictureURL,
        amountOwed: -share,
      });
    }
  });

  const consolidateData = (data: any) => {
    const map = new Map();

    data.forEach((item: any) => {
      const id = item.id;
      if (map.has(id)) {
        map.get(id).amountOwed += item.amountOwed;
      } else {
        map.set(id, { ...item });
      }
    });

    return Array.from(map.values());
  };

  let peopleWithBalances = consolidateData([...peopleExpense, ...people]);

  try {
    res.status(201).json({
      people: peopleWithBalances,
    });
  } catch (err) {
    const error = new HttpError(
      'Getting people failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

exports.addUser = addUser;
exports.login = login;
exports.addPeople = addPeople;
exports.getPeople = getPeople;
