'use strict';
const recipeService = require('../service/recipeService');

async function recipeList(req, res) {
    try {
        const data = await recipeService.getRecipeList();
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
    res.end();
}

async function userRecipes(req, res) {
    try {
        const data = await recipeService.getUserRecipes(req.query.username);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
    res.end();
}

async function recipeIngredients(req, res) {
    try {
        const data = await recipeService.getRecipeIngredients(req.query.recipeName);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
    res.end();

}

async function createRecipe(req, res) {
    try {
        await recipeService.postRecipe(req.body);
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

// getRecipeList,
//     getUserRecipes,
//     postRecipe,
//     getRecipeId,
//     postRecipeIngredients,
//     getRecipeIngredients
