'use strict';

const { postRecipe } = require('../service/index');

require('dotenv').config({path:'../backend/.env'});

const searchUrl = process.env.THEMEALDB_BASEURL + "/search.php?s=";

async function searchMealDb(req, res) {
  const result = [];

  try {
    if (req.query.search.length === 0) {
      res.status(500);
      res.end();
    }

    await fetch(searchUrl + req.query.search)
      .then((response) => response.json())
      .then((data) => {
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
      });
    res.json(result);
    postRecipe(result);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
  res.end();
}

module.exports = {
  searchMealDb
};
