const connection = require('../client/databaseConnection')

async function getUserDB(username) {
    try {
        let pool = await connection.getPool();
        let data = await pool.request().query(`SELECT user_id FROM Users WHERE username = '${username}'`);
        return data.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function postUserDB(username) {
    try {
        let pool = await connection.getPool();
        await pool.request().query(`INSERT INTO Users (username) VALUES ('${username}')`);
    }
    catch (error) {
        console.log(error);
    }
}

async function getRecipeList() {
    try {
        let pool = await connection.getPool();
        let data = await pool.request().query(`select recipe_name, category, instructions, picture_location 
            FROM Recipes rec 
            JOIN RecipeCategories rc ON rec.recipe_id = rc.recipe_id 
            JOIN Categories c ON rc.category_id = c.category_id`);
        return data.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

async function getRecipeIngredients(recipeName) {
    try {
        let pool = await connection.getPool();
        let data = await pool.request().query(`select ingredient_name, amount, measurement_type FROM Recipes rec 
        JOIN RecipeIngredients ri ON rec.recipe_id = ri.recipe_id
        JOIN Ingredients i ON ri.ingredient_id = i.ingredient_id
        JOIN MeasurementTypes mt ON ri.measurement_type_id = mt.measurement_type_id
        WHERE recipe_name = '${recipeName}'`);
        return data.recordsets;
    }
    catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUserDB,
    postUserDB,
    getRecipeList,
    getRecipeIngredients
};
