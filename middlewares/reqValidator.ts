import { RequestHandler } from 'express';

const { validationResult } = require('express-validator');
const HttpError = require('../models/httpError');

const validateReq: RequestHandler = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new HttpError(
      'Invalid inputs passed, please check your data.',
      422,
      { message: JSON.stringify(errors) },
      'small',
    );
    return next(error);
  }
  next();
};

module.exports = { validateReq };
