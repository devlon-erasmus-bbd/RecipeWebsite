'use strict';

const express = require('express');
const app = express();
const { login, newUser, getUserId } = require('./src/controllers/login');
const { recipeList, recipeIngredients } = require('./src/controllers/recipes');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.get('/login', login);
app.get('/user', getUserId);
app.get('/recipes/list', recipeList);
app.get('/recipes/ingredients', recipeIngredients);

app.post('/user', newUser);

app.listen(PORT);
