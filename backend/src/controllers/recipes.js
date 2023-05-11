'use strict';
const { getRecipeList, getUserRecipes, getRecipeIngredients, postRecipe, getRecipesByCategory, checkRecipeExists } = require('../service/index');

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
        if (await checkRecipeExists(req.body[0].recipeName)) {
            res.status(409);
            res.end();
            return;
        }
    } catch(err) {
        res.status(500);
        res.end();
        return;
    }

    try {
        await postRecipe(req.body);
        res.status(201);
    } catch (err) {
        console.log(err);
        res.status(409);
    }
    res.end();
}

async function recipeByCategory(req, res) {
    try {
        const data = await getRecipesByCategory(req.query.category);
        res.json(data[0]);
    } catch (err) {
        console.log(err);
        res.status(500);
    }
    res.end();
}

module.exports = {
    recipeList,
    recipeIngredients,
    createRecipe,
    userRecipes,
    recipeByCategory
};
