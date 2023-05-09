'use strict';

const express = require('express');
const path = require('path');
const app = express();
const { login, newUser, getUserId } = require('./src/controllers/login');
const { recipeList, recipeIngredients } = require('./src/controllers/recipes');

require('dotenv').config();

const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.get('/login', login);
app.get('/user', getUserId);
app.get('/recipes/list', recipeList);
app.get('/recipes/ingredients', recipeIngredients);

app.post('/user', newUser);

app.listen(PORT);
console.log('Running at Port 8080');
