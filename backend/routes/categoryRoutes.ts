import { Router } from 'express';
const { check } = require('express-validator');
const { validateReq } = require('../middlewares/reqValidator');
const categoryController = require('../controllers/categoryController');

const router = Router();

router.post(
  '/:uid/add',
  [check('name').not().isEmpty().withMessage('Name is required')],
  validateReq,
  categoryController.createCategory,
);

router.get('/user/:userId', categoryController.getCategoriesByUserId);

router.patch(
  '/:id',
  [check('name').not().isEmpty().withMessage('Name is required')],
  validateReq,
  categoryController.updateCategory,
);

router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
