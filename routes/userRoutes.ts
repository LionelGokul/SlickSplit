import { Router } from 'express';

const { check } = require('express-validator');
const { validateReq } = require('../middlewares/reqValidator');
const { checkAuth } = require('../middlewares/auth');
const router = Router();
const userController = require('../controllers/userController');

router.post(
  '/sign-up',
  [
    check('name').not().isEmpty(),
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
    check('number').not().isEmpty(),
  ],
  validateReq,
  userController.addUser,
);

router.post(
  '/login',
  [
    check('email').normalizeEmail().isEmail(),
    check('password').isLength({ min: 6 }),
  ],
  validateReq,
  userController.login,
);

router.use(checkAuth);

router.post(
  '/:uid/people/add',
  [check('email').normalizeEmail().isEmail()],
  validateReq,
  userController.addPeople,
);

router.get('/:uid/people', userController.getPeople);

module.exports = router;
