/* global process, __dirname */

'use strict';

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const {
  login,
  signup,
  getUser,
  userDeatils,
  recipeList,
  recipeIngredients,
  userRecipes,
  createRecipe,
  searchMealDb,
  categoryList,
  recipeByCategory
} = require('./src/controllers/index');

const { auth } = require('./src/middleware/index');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, POST, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  next();
});

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(auth);

app.post('/login', login);
app.post('/signup', signup);
app.get('/user', getUser);
app.get('/user-details/:email', userDeatils);

app.get('/recipes/user', userRecipes);
app.get('/recipes/list', recipeList);
app.get('/recipes/ingredients', recipeIngredients);
app.get('/recipes/search', searchMealDb);
app.get('/recipes/category', recipeByCategory);
app.post('/recipes', createRecipe);

app.get('/categories/list', categoryList);

app.listen(PORT);
console.log(`Running at Port ${PORT}`);
