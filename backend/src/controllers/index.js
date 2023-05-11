'use strict';

const { login } = require('./login');
const { signup } = require('./signup');
const { getUser, userDeatils } = require('./getUser');
const { searchMealDb } = require('./theMealDb');
const { categoryList } = require('./category');
const { recipeList, recipeIngredients, createRecipe, userRecipes, recipeByCategory } = require('./recipes');

module.exports = {
  login,
  signup,
  getUser,
  recipeList,
  recipeIngredients,
  createRecipe,
  userRecipes,
  searchMealDb,
  categoryList,
  userDeatils,
  recipeByCategory
};
