'use strict';

const { postRecipe, getRecipeList } = require('../service/index');

require('dotenv').config({path:'../backend/.env'});

const searchUrl = process.env.THEMEALDB_BASEURL + "/search.php?s=";

async function searchMealDb(req, res) {
  const result = [];

  const search = req.query.search;

  try {
    if (search.length === 0) {
      res.status(500);
      res.end();
    }

    await fetch(searchUrl + search)
      .then((response) => response.json())
      .then(async (data) => {
        if (data.meals == null) {
          return;
        }
        const myMeal = data.meals[0];

        const meal = {};

        meal.recipeName = myMeal.strMeal;
        meal.category = myMeal.strCategory;
        meal.instructions = myMeal.strInstructions;
        meal.username = 'TheMealDB';
        meal.pictureLocation = myMeal.strMealThumb;

        let ingredientKey = 'strIngredient1';
        let measureKey = 'strMeasure1';
        let count = 0;

        meal.ingredients = [];

        while (myMeal[ingredientKey].length > 1) {
          const ingredient = {};

          ingredient.name = myMeal[ingredientKey];
          ingredient.measurement = myMeal[measureKey];
          meal.ingredients[count] = ingredient;
          count++;
          ingredientKey = ingredientKey.replace(count, count + 1);
          measureKey = measureKey.replace(count, count + 1);
        }

        result[0] = meal;
        await postRecipe(result);
      });
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.json(await getRecipesMatchingSearch(search));
  res.end();
}

async function getRecipesMatchingSearch(search) {
  let result = [];
  let i = 0;
  let currentRecipes = await getRecipeList();
  currentRecipes = currentRecipes[0];
  
  currentRecipes.forEach(recipe => {
    if (recipe.recipe_name.toLowerCase().includes(search.toLowerCase()) || 
        recipe.category.toLowerCase().includes(search.toLowerCase())) {
      result[i++] = recipe;
    }
  });
  return result;
}

module.exports = {
  searchMealDb
};
