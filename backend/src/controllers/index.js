'use strict';

const { login } = require('./login');
const { signup } = require('./signup');
const { getUser } = require('./getUser');
const { recipeList, recipeIngredients, createRecipe, userRecipes, recipeByCategory } = require('./recipes');
const { searchMealDb } = require('./theMealDb')
const { categoryList } = require('./category')

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
  recipeByCategory
};
