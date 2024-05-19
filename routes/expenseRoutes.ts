import { Router } from 'express';
const mongoose = require('mongoose');

const { check } = require('express-validator');
const { validateReq } = require('../middlewares/reqValidator');
const router = Router();
const expenseController = require('../controllers/expenseController');
const ObjectId = mongoose.Types.ObjectId;

router.post(
  '/add',
  [
    check('expense.name').not().isEmpty().withMessage('Name is required'),
    check('expense.category')
      .not()
      .isEmpty()
      .withMessage('Category is required'),
    check('expense.amount')
      .isNumeric()
      .withMessage('Amount must be a number')
      .notEmpty()
      .withMessage('Amount is required'),
    check('expense.date')
      .not()
      .isEmpty()
      .withMessage('Date is required')
      .isISO8601()
      .toDate()
      .withMessage('Date must be a valid ISO 8601 date string'),
    check('expense.paidBy')
      .custom((value: String) => ObjectId.isValid(value))
      .withMessage('PaidBy must be a valid ObjectId')
      .notEmpty()
      .withMessage('PaidBy is required'),
    check('userId')
      .custom((value: String) => ObjectId.isValid(value))
      .withMessage('userId must be a valid ObjectId')
      .notEmpty()
      .withMessage('userId is required'),
    check('expense.sharedBy')
      .isArray()
      .withMessage('SharedBy must be an array')
      .custom((value: Array<String>) =>
        value.every((id: String) => ObjectId.isValid(id)),
      )
      .withMessage('Every member of sharedBy must be a valid ObjectId'),
    check('expense.description')
      .optional()
      .isString()
      .withMessage('Description must be a string if provided'),
  ],
  validateReq,
  expenseController.addExpense,
);

router.patch(
  '/update/:eid',
  [
    check('name').not().isEmpty(),
    check('category').not().isEmpty(),
    check('amount')
      .isNumeric()
      .withMessage('Amount must be a number')
      .notEmpty()
      .withMessage('Amount is required'),
    check('paidBy')
      .custom((value: String) => ObjectId.isValid(value))
      .withMessage('PaidBy must be a valid ObjectId')
      .notEmpty()
      .withMessage('PaidBy is required'),
    check('sharedBy').isArray().withMessage('SplitAmong must be an array'),
    check('sharedBy.*.user')
      .custom((value: String) => ObjectId.isValid(value))
      .withMessage('Each user in SplitAmong must be a valid ObjectId'),
    check('group')
      .custom((value: String) => ObjectId.isValid(value))
      .withMessage('Group must be a valid ObjectId'),
    check('description')
      .optional()
      .isString()
      .withMessage('Description must be a string if provided'),
  ],
  validateReq,
  expenseController.updateExpense,
);

router.delete('/delete/:eid', expenseController.deleteExpense);

module.exports = router;
