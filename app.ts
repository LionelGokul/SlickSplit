const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
import { RequestHandler, Request, Response, NextFunction } from 'express';

const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const HttpError = require('./models/httpError');
import serverless from 'serverless-http';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded());
const PORT = 5000;
console.log(process.env.FRONTEND_URL);

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

app.use('/api/users', userRoutes);
app.use('/api/expenses', expenseRoutes);

const notFoundHandler: RequestHandler = async (req, res, next) => {
  const error = new HttpError('Could not find this route', 404, {}, 'medium');
  return next(error);
};

app.use(notFoundHandler);

app.use(
  (
    error: typeof HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    console.log(error);
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
  },
);

mongoose
  .connect(
    'mongodb+srv://gokul:2sZ2xrKesQksPsJs@slicksplit.cojb18h.mongodb.net/slicksplit?retryWrites=true&w=majority&appName=slicksplit',
  )
  .then(() => {
    app.listen(PORT || 5000);
    console.log('Listening on port:', PORT || 5000);
  })
  .catch((err: Error) => {
    console.log(err);
  });

export const handler = serverless(app);
