'use strict';

const connection = require('../client/databaseConnection');
const { getUserId } = require('./userService');
const { postCategory, getCategory } = require('./categoryService');

async function getRecipeList() {
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT recipe_name, username, category, instructions, picture_location 
            FROM Recipes rec 
            JOIN Categories c ON rec.category_id = c.category_id
            JOIN Users u ON rec.user_id = u.user_id;`);

  return data.recordsets;
}

async function getUserRecipes(username) {
  username = username.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT recipe_name, username, category, instructions, picture_location 
            FROM Recipes rec
            JOIN Categories c ON rec.category_id = c.category_id
            JOIN Users u ON rec.user_id = u.user_id
            WHERE username = '${username}';`);

  return data.recordsets;
}

async function postRecipe(recipeData) {
  await postCategory(recipeData[0].category);

  let category_id = await getCategory(recipeData[0].category);
  let user_id = await getUserId(recipeData[0].username);

  category_id = category_id[0][0].category_id;
  user_id = user_id[0][0].user_id;

  const recipeName = recipeData[0].recipeName.replace("'", "");
  const instructions =  recipeData[0].instructions.replace("'", ""); 

  const pool = await connection.getPool();

  await pool.request().query(`INSERT INTO Recipes (recipe_name, user_id, category_id, instructions, picture_location)
        VALUES ('${recipeName}', ${user_id}, ${category_id}, '${instructions}', '${recipeData[0].pictureLocation}');`);

  await postRecipeIngredients(recipeData);
}

async function getRecipeId(recipeName) {
  recipeName = recipeName.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT recipe_id FROM Recipes
            WHERE recipe_name = '${recipeName}';`);

  return data.recordsets;
}

async function postRecipeIngredients(recipeData) {

  const recipeName = recipeData[0].recipeName.replace("'", "");

  let recipeId = await getRecipeId(recipeName);
  recipeId = recipeId[0][0].recipe_id;

  const pool = await connection.getPool();

  recipeData[0].ingredients.forEach(async (ingredient) => {
    const ingredientName = ingredient.name.replace("'", "");
    const ingredientMeasurement = ingredient.measurement.replace("'", "");

    await postIngredient(ingredientName);
    let ingredientId = await getIngredientId(ingredientName);
    ingredientId = ingredientId[0][0].ingredient_id;

    await pool.request().query(`INSERT INTO RecipeIngredients (recipe_id, ingredient_id, measurement) 
            VALUES (${recipeId}, ${ingredientId}, '${ingredientMeasurement}');`);
  });
}

async function getRecipeIngredients(recipeName) {
  recipeName = recipeName.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT ingredient_name ingredient, measurement FROM Recipes rec 
            JOIN RecipeIngredients ri ON rec.recipe_id = ri.recipe_id
            JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
            WHERE recipe_name = '${recipeName}';`);

  return data.recordsets;
}

async function postIngredient(ingredient) {
  ingredient = ingredient.replace("'", "");
  const pool = await connection.getPool();

  await pool.request().query(`IF NOT EXISTS (
            SELECT 1 FROM Ingredients WHERE ingredient_name = '${ingredient}')
            INSERT INTO Ingredients (ingredient_name) VALUES ('${ingredient}');`);
}

async function getIngredientId(ingredient) {
  ingredient = ingredient.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT ingredient_id FROM Ingredients
            WHERE Ingredient_name = '${ingredient}';`);

  return data.recordsets;
}

async function getRecipesByCategory(category) {
  category = category.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT recipe_name, username, category, instructions, picture_location 
            FROM Recipes rec
            JOIN Categories c ON rec.category_id = c.category_id
            JOIN Users u ON rec.user_id = u.user_id
            WHERE category = '${category}';`);
  return data.recordsets;
}

async function checkRecipeExists(recipeName) {
  recipeName = recipeName.replace("'", "");
  const pool = await connection.getPool();
  const data = await pool.request().query(`SELECT 1
        FROM Recipes rec
        JOIN Users u ON rec.user_id = u.user_id
        WHERE recipe_name = '${recipeName}';`);

  return (data.rowsAffected[0] !== 0);
}

module.exports = {
  getRecipeList,
  getUserRecipes,
  postRecipe,
  getRecipeId,
  postRecipeIngredients,
  getRecipeIngredients,
  getRecipesByCategory,
  checkRecipeExists
};