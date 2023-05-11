'use strict';

const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');

const {
  login,
  signup,
  getUser,
  recipeList,
  recipeIngredients,
  userRecipes, 
  createRecipe, 
  searchMealDb, 
  categoryList,
  recipeByCategory
} = require('./src/controllers/index');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.post('/login', login);
app.post('/signup', signup);
app.get('/user', getUser);

app.get('/recipes/user', userRecipes);
app.get('/recipes/list', recipeList);
app.get('/recipes/ingredients', recipeIngredients);
app.get('/recipes/search', searchMealDb);
app.get('/recipes/category', recipeByCategory);
app.post('/recipes', createRecipe);

app.get('/categories/list', categoryList);

app.listen(PORT);
console.log('Running at Port 8080');
