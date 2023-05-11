'use strict';

const { login } = require('./login');
const { signup } = require('./signup');
const { getUser, userDeatils } = require('./getUser');
const { recipeList, recipeIngredients, createRecipe, userRecipes } = require('./recipes');
const { searchMealDb } = require('./theMealDb');
const { categoryList } = require('./category');

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
  userDeatils
};
