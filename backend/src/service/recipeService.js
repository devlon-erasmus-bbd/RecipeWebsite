const connection = require('../client/databaseConnection');
const { postCategory, getCategory } = require('./categoryService');
const { getUserId } = require('./userService');

async function getRecipeList() {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT recipe_name, username, category, instructions, picture_location 
            FROM Recipes rec 
            JOIN Categories c ON rec.category_id = c.category_id
            JOIN Users u ON rec.user_id = u.user_id`);
    return data.recordsets;
}

async function getUserRecipes(username) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT recipe_name, username, category, instructions, picture_location 
            FROM Recipes rec
            JOIN Categories c ON rec.category_id = c.category_id
            JOIN Users u ON rec.user_id = u.user_id
            WHERE username = '${username}'`);
    return data.recordsets;
}

async function postRecipe(recipeData) {
    await postCategory(recipeData[0].category);

    category_id = await getCategory(recipeData[0].category);
    user_id = await getUserId(recipeData[0].username);

    category_id = category_id[0][0].category_id;
    user_id = user_id[0][0].user_id;

    let pool = await connection.getPool();
    await pool.request().query(`INSERT INTO Recipes (recipe_name, user_id, category_id, instructions, picture_location)
        VALUES ('${recipeData[0].recipeName}', ${user_id}, ${category_id}, '${recipeData[0].instructions}', '${recipeData[0].pictureLocation}')`);

    await postRecipeIngredients(recipeData);
}

async function getRecipeId(recipeName) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT recipe_id FROM Recipes
            WHERE recipe_name = '${recipeName}'`);
    return data.recordsets;
}

async function postRecipeIngredients(recipeData) {
    recipeId = await getRecipeId(recipeData[0].recipeName);
    recipeId = recipeId[0][0].recipe_id;

    let pool = await connection.getPool();

    recipeData[0].ingredients.forEach(async ingredient => {
        await postIngredient(ingredient.name);
        ingredientId = await getIngredientId(ingredient.name);
        ingredientId = ingredientId[0][0].ingredient_id;

        await pool.request().query(`INSERT INTO RecipeIngredients (recipe_id, ingredient_id, measurement) 
            VALUES (${recipeId}, ${ingredientId}, '${ingredient.measurement}')`);
    });
}

async function getRecipeIngredients(recipeName) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT ingredient_name ingredient, measurement FROM Recipes rec 
            JOIN RecipeIngredients ri ON rec.recipe_id = ri.recipe_id
            JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
            WHERE recipe_name = '${recipeName}'`);
    return data.recordsets;
}

async function postIngredient(ingredient) {
    let pool = await connection.getPool();
    await pool.request().query(`IF NOT EXISTS (
            SELECT 1 FROM Ingredients WHERE ingredient_name = '${ingredient}')
            INSERT INTO Ingredients (ingredient_name) VALUES ('${ingredient}')`);
}

async function getIngredientId(ingredient) {
    let pool = await connection.getPool();
    let data = await pool.request().query(`SELECT ingredient_id FROM Ingredients
            WHERE Ingredient_name = '${ingredient}'`);
    return data.recordsets;
}

module.exports = {
    getRecipeList,
    getUserRecipes,
    postRecipe,
    getRecipeId,
    postRecipeIngredients,
    getRecipeIngredients
};