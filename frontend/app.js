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
} = require('../backend/src/controllers/index');

const { auth } = require('../backend/src/middleware/index');

require('dotenv').config({path:'../backend/.env'});

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(auth);

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.get('/recipes/display', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'displayRecipes.html'));
});

app.get('/login/page', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'loginPage.html'));
});

app.get('/user/new', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'newUser.html'));
});

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
