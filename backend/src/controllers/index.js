'use strict';

const { login } = require('./login');
const { signup } = require('./signup');
const { getUserId } = require('./getUser');
const { recipeList, recipeIngredients } = require('./recipes');
const { testAuth } = require('./authorisation');

module.exports = {
  login,
  signup,
  getUserId,
  recipeList,
  recipeIngredients,
  testAuth
};
