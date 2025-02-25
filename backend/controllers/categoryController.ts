import { RequestHandler } from 'express';
const mongoose = require('mongoose');

const HttpError = require('../models/httpError');
const Category = require('../models/categories');

const createCategory: RequestHandler = async (req, res, next) => {
  const { name, createdBy } = req.body;

  const newCategory = new Category({
    name,
    createdBy: createdBy,
  });

  try {
    await newCategory.save();
    res.status(201).json({ category: newCategory });
  } catch (err) {
    const error = new HttpError(
      'Creating category failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const updateCategory: RequestHandler = async (req, res, next) => {
  const { name } = req.body;
  const categoryId = req.params.id;

  let category;
  try {
    category = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      'Fetching category failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!category) {
    const error = new HttpError('Category not found.', 404, {}, 'small');
    return next(error);
  }

  category.name = name;

  try {
    await category.save();
    res.status(200).json({ category });
  } catch (err) {
    const error = new HttpError(
      'Updating category failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const deleteCategory: RequestHandler = async (req, res, next) => {
  const categoryId = req.params.id;

  let category;
  try {
    category = await Category.findById(categoryId);
  } catch (err) {
    const error = new HttpError(
      'Fetching category failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!category) {
    const error = new HttpError('Category not found.', 404, {}, 'small');
    return next(error);
  }

  try {
    await category.remove();
    res.status(200).json({ message: 'Category deleted successfully.' });
  } catch (err) {
    const error = new HttpError(
      'Deleting category failed, please try again.',
      500,
      err,
      'high',
    );
    return next(error);
  }
};

const getCategoriesByUserId: RequestHandler = async (req, res, next) => {
  const userId = req.params.userId;

  let categories;
  try {
    categories = await Category.find({ createdBy: userId });
  } catch (err) {
    const error = new HttpError(
      'Fetching categories failed, please try again later.',
      500,
      err,
      'high',
    );
    return next(error);
  }

  if (!categories || categories.length === 0) {
    return res.status(200).json({ categories: [] });
  }

  res.status(200).json({ categories });
};

module.exports = {
  updateCategory,
  deleteCategory,
  getCategoriesByUserId,
  createCategory,
};
