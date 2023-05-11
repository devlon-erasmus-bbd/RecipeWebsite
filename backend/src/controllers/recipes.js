'use strict';
const { getRecipeList, getUserRecipes, getRecipeIngredients, postRecipe } = require('../service/index');

async function recipeList(req, res) {
  try {
    const data = await getRecipeList();

    res.json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.end();
}

async function userRecipes(req, res) {
  try {
    const data = await getUserRecipes(req.query.username);

    res.json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.end();
}

async function recipeIngredients(req, res) {
  try {
    const data = await getRecipeIngredients(req.query.recipeName);

    res.json(data[0]);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.end();

}

async function createRecipe(req, res) {
  try {
    await postRecipe(req.body);
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(409);
  }
  res.end();

}

module.exports = {
  recipeList,
  recipeIngredients,
  createRecipe,
  userRecipes
};
