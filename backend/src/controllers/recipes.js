'use strict';
const databaseService = require('../service/databaseService');

async function recipeList(req, res) {
  const data = await databaseService.getRecipeList();

  res.json(data[0]);
  res.end();
}

async function recipeIngredients(req, res) {
  const data = await databaseService.getRecipeIngredients(req.query.recipeName);

  res.json(data[0]);
  res.end();
}

module.exports = {
  recipeList,
  recipeIngredients
};
