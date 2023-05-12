'use strict';

const { postUser, getUserId, getUserDetails } = require('./userService');
const { postCategory, getCategory, getCategoryList } = require('./categoryService');
const { getRecipeList, getUserRecipes, postRecipe, getRecipeId, postRecipeIngredients, getRecipeIngredients, getRecipesByCategory, checkRecipeExists } = require('./recipeService');

module.exports = {
  postUser,
  getUserId,
  postCategory,
  getCategory,
  getCategoryList,
  getRecipeList,
  getUserRecipes,
  postRecipe,
  getRecipeId,
  postRecipeIngredients,
  getRecipeIngredients,
  getUserDetails,
  getRecipesByCategory,
  checkRecipeExists
  };